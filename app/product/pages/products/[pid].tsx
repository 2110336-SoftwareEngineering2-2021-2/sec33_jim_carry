import { BlitzPage, useParam } from "blitz"
import { Description } from "app/product/components/Description"
import { ProductTitle } from "app/product/components/ProductTitle"
import { Seller } from "app/product/components/Seller"
import { FooterButton } from "app/product/components/FooterButton"
import { setupLayout } from "app/core/utils/setupLayout"

interface Seller {
  name: string
  rating: number
  amount: number
}

interface Product {
  seller: Seller
  name: string
  price: number
  tags: string[]
  description: string
  isWish: boolean
}

const ProductDetail: BlitzPage = () => {
  const pid = useParam("pid")
  const product: Product = {
    name: "(ของแท้ 100%) Adidas รองเท้า สีฟ้า Size 38",
    price: 1500,
    seller: { name: "nogntent_shopping", rating: 4.8, amount: 2543 },
    tags: ["Adidas", "Shoes"],
    description:
      pid == "1"
        ? "(ของแท้ 100%) Adidas รองเท้า สีฟ้าอมเทา Size 38 ใช้งานเพียงแค่ 2-3 ครั้ง สภาพใหม่มาก สามารถแชทมาสอบถามเพิ่มเติมได้ครับ"
        : " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet ligula id imperdiet pharetra. Nam dictum libero eget est sollicitudin, in accumsan orci luctus. Quisque elementum iaculis eleifend. Sed egestas libero ac mi ultrices, ac porttitor ante pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tellus nunc, eu feugiat ex malesuada ac. Nam euismod purus vitae justo interdum semper. Vivamus ante nibh, volutpat gravida ante at, varius pharetra sem. Aliquam erat volutpat. Vivamus pharetra pulvinar dolor, nec convallis massa elementum vel. Mauris fringilla justo at eros dignissim auctor. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id metus ut magna faucibus rutrum. Praesent eu mauris congue, accumsan quam eu, congue neque. Curabitur at nunc iaculis, efficitur massa non, feugiat leo. Sed quam turpis, sodales id convallis et, accumsan at libero. In purus justo, lacinia sit amet pulvinar sit amet, dignissim ac nunc. Quisque varius risus vitae vulputate tempus. Donec et nisl ac lorem consequat luctus non id augue. Nulla facilisi. Aliquam erat volutpat. Proin placerat augue pellentesque arcu lobortis mattis. Quisque ultrices volutpat placerat. Praesent placerat tellus mattis ornare luctus. Pellentesque ultricies ex id tortor sagittis, sed ultrices tortor luctus. Nulla eleifend malesuada fermentum. Donec ornare mauris eu eros malesuada dictum. ",
    isWish: true,
  }
  return (
    <div>
      {/* Product Id: {pid} */}
      <div style={{ height: 249, backgroundColor: "grey" }}></div>
      <div className="flex flex-col divide-y divide-sky-lighter">
        <ProductTitle name={product.name} price={product.price} isWish={product.isWish} />
        <Seller
          name={product.seller.name}
          rating={product.seller.rating}
          amount={product.seller.amount}
        />
        <Description tags={product.tags} description={product.description} />
      </div>
      <FooterButton />
    </div>
  )
}

setupLayout(ProductDetail)

export default ProductDetail
