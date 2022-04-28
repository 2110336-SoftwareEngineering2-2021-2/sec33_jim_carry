import {
  BlitzPage,
  invokeWithMiddleware,
  PromiseReturnType,
  useMutation,
} from 'blitz'
import { z } from 'zod'

import { Button } from 'app/core/components/Button'
import Form, { FORM_ERROR } from 'app/core/components/Form'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { OrderProduct } from 'app/order/components/OrderProduct'
import getOrder from 'app/order/queries/getOrder'
import { ReviewStarInput } from 'app/reviews/components/ReviewStarInput'
import writeReview from 'app/reviews/mutations/writeReview'

interface WriteReviewPageProps {
  order: PromiseReturnType<typeof getOrder>
}

const WriteReviewPage: BlitzPage<WriteReviewPageProps> = ({ order }) => {
  const [writeReviewMutation] = useMutation(writeReview)
  const goBack = useGoBack()
  let reviewFormSchema = {}
  order.items.forEach((item) => {
    const pid = item.productId
    reviewFormSchema = {
      ...reviewFormSchema,
      [`rating-${pid}`]: z.string(),
      [`title-${pid}`]: z.string().nonempty(),
      [`comment-${pid}`]: z.string(),
    }
  })
  const ReviewFormSchema = z.object(reviewFormSchema)
  return (
    <>
      <TopBar title="Review" largeTitle />
      <Form
        className="flex flex-col px-6 py-3 gap-4"
        submitText="Submit Review"
        schema={ReviewFormSchema}
        onSubmit={async (values) => {
          const reviews = order.items.map((item) => {
            return {
              productId: item.productId,
              rating: Number(values[`rating-${item.productId}`]),
              title: values[`title-${item.productId}`],
              comment: values[`comment-${item.productId}`],
            }
          })
          try {
            await writeReviewMutation({ orderId: order.id, reviews })
            await goBack()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        {order.items.map((e, idx) => (
          <div className="flex flex-col" key={e.id}>
            <OrderProduct item={e} />
            <div className="self-center w-full">
              <ReviewStarInput orderItem={e} />
            </div>
          </div>
        ))}
      </Form>
    </>
  )
}

export const getServerSideProps = wrapGetServerSideProps<WriteReviewPageProps>(
  async (context) => {
    const redirectToHome = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
    const { params } = context
    const { oid } = params!
    const orderId = Number(oid)
    if (!Number.isInteger(orderId)) {
      return redirectToHome
    }
    try {
      const order = await invokeWithMiddleware(getOrder, { orderId }, context)
      return { props: { order } }
    } catch {
      return redirectToHome
    }
  }
)

setupAuthRedirect(WriteReviewPage)
setupLayout(WriteReviewPage)

export default WriteReviewPage
