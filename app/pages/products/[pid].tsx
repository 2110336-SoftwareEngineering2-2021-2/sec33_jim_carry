import { SecondaryPageLayout } from "app/core/layouts/SecondaryPageLayout"
import { useParam } from "blitz"
import { FiHeart } from "react-icons/fi"
import Description from "./components/Description"
import ProductTitle from "./components/ProductTitle"
import Seller from "./components/Seller"

const ProductDetail = () => {
  const pid = useParam("pid")
  const product = {
    name: "(ของแท้ 100%) Adidas รองเท้า สีฟ้า Size 38",
    price: "1500",
    seller: { name: "nogntent_shopping", rating: 4.8, amount: 2543 },
    tags: ["Adidas", "Shoes"],
    description:
      "(ของแท้ 100%) Adidas รองเท้า สีฟ้าอมเทา Size 38 ใช้งานเพียงแค่ 2-3 ครั้ง สภาพใหม่มาก สามารถแชทมาสอบถามเพิ่มเติมได้ครับ",
  }
  return (
    <div>
      {/* Product Id: {pid} */}
      <div style={{ height: 249, backgroundColor: "grey" }}></div>
      <div className="flex flex-col divide-y divide-sky-lighter">
        <ProductTitle name={product.name} price={product.price} />
        <Seller seller={product.seller} />
        <Description tags={product.tags} description={product.description} />
      </div>
    </div>
  )
}

ProductDetail.getLayout = (page) => <SecondaryPageLayout>{page}</SecondaryPageLayout>

export default ProductDetail
