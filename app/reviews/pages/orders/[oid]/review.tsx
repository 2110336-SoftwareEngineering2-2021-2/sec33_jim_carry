import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'
import { useState } from 'react'

import { Button } from 'app/core/components/Button'
import Form from 'app/core/components/Form'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { OrderProduct } from 'app/order/components/OrderProduct'
import getOrder from 'app/order/queries/getOrder'
import { ReviewStarInput } from 'app/reviews/components/ReviewStarInput'

interface WriteReviewPageProps {
  order: PromiseReturnType<typeof getOrder>
}

const WriteReviewPage: BlitzPage<WriteReviewPageProps> = ({ order }) => {
  return (
    <>
      <TopBar title="Review" largeTitle />
      <Form
        className="flex flex-col px-6 py-3 space-y-4"
        submitText="Submit Review"
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
        {order.items.map((e, idx) => (
          <div className="flex flex-col" key={e.id}>
            <OrderProduct item={e} />
            <div className="self-center">
              <ReviewStarInput name={`rating-${e.id}`} />
            </div>
          </div>
        ))}
      </Form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  WriteReviewPageProps
> = async (context) => {
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

setupAuthRedirect(WriteReviewPage)
setupLayout(WriteReviewPage)

export default WriteReviewPage
