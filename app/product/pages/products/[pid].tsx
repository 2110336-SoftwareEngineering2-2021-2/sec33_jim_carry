import { BlitzPage, invokeWithMiddleware, PromiseReturnType } from 'blitz'
import { Head, Link, Routes } from 'blitz'

import { ShoppingBagAction } from 'app/core/components/ShoppingBagAction'
import { TopBar } from 'app/core/components/TopBar'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupLayout } from 'app/core/utils/setupLayout'
import countOrders from 'app/order/queries/countSoldOrders'
import { Description } from 'app/product/components/Description'
import { FooterButton } from 'app/product/components/FooterButton'
import { ProductPicture } from 'app/product/components/ProductPicture'
import { ProductTitle } from 'app/product/components/ProductTitle'
import { Seller } from 'app/product/components/Seller'
import getProduct from 'app/product/queries/getProduct'
import ShowReviews from 'app/reviews/components/ShowReviews'
import getReviews from 'app/reviews/queries/getReviews'

interface ProductDetailProps {
  product: PromiseReturnType<typeof getProduct>
  reviews: PromiseReturnType<typeof getReviews>
  soldCount: PromiseReturnType<typeof countOrders>
}

const ProductDetail: BlitzPage<ProductDetailProps> = ({
  product,
  reviews,
  soldCount,
}) => {
  const rating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const noRating = reviews.length === 0 ? true : false
  return (
    <div>
      <TopBar actions={<ShoppingBagAction />} />
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductPicture imgSrc={product.images} />
      <div className="flex flex-col divide-y divide-sky-lighter">
        <ProductTitle product={product} />
        <Link
          href={Routes.ShopProfilePage({ shopId: product.shopId })}
          passHref
        >
          <a>
            <Seller
              name={product.shop.name}
              rating={rating}
              amount={soldCount}
              pic={product.shop.image}
              noRating={noRating}
            />
          </a>
        </Link>
        <Description
          tags={product.hashtags}
          description={product.description ?? ''}
        />
        <ShowReviews productId={product.id} />
      </div>
      <FooterButton product={product} />
    </div>
  )
}

setupLayout(ProductDetail)

export const getServerSideProps = wrapGetServerSideProps<ProductDetailProps>(
  async (context) => {
    const { params } = context
    const { pid } = params!
    const productId = Number(pid)
    if (!Number.isInteger(productId)) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    const product = await invokeWithMiddleware(
      getProduct,
      { id: productId },
      context
    )
    const reviewsPromise = invokeWithMiddleware(
      getReviews,
      { by: 'shop', id: product.shopId },
      context
    )
    const soldCountPromise = invokeWithMiddleware(
      countOrders,
      {
        where: {
          shopId: product.shopId,
          status: { not: 'CANCELLED' },
        },
      },
      context
    )
    const [reviews, soldCount] = await Promise.all([
      reviewsPromise,
      soldCountPromise,
    ])
    return {
      props: { product, reviews, soldCount },
    }
  }
)

export default ProductDetail
