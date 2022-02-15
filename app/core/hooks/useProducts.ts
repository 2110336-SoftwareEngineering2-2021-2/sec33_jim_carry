import { useQuery } from 'blitz'

import getProducts from 'app/product/queries/getProducts'

const mockHashtag1 = {
  id: 1,
  name: 'Adidas',
}
const mockHashtag2 = {
  id: 2,
  name: 'Shoes',
}
const mockShop1 = {
  id: 1,
  user: {},
  userId: 0,
  bio: 'abc.com',
  phoneNo: '0987654321',
  name: 'nongtent_shopping',
  images: [],
  rating: 3.7,
  totalSale: '2017',
  products: [],
  followers: [],
}
const mockProduct1 = {
  id: 1,
  shop: mockShop1,
  shopId: 1,
  name: '(ของแท้ 100%) Adidas รองเท้า สีฟ้า Size 38',
  description:
    '(ของแท้ 100%) Adidas รองเท้า สีฟ้าอมเทา Size 38 ใช้งานเพียงแค่ 2-3 ครั้ง สภาพใหม่มาก สามารถแชทมาสอบถามเพิ่มเติมได้ครับ',
  price: 1500,
  soldPrice: null,
  stock: 1,
  hidden: false,
  category: [],
  hashtags: [mockHashtag1, mockHashtag2],
  wishlistedBy: [],
  selectedBy: [],
}
const mockProduct2 = {
  id: 2,
  shop: mockShop1,
  shopId: 1,
  name: '(ของแท้ 100%) Adidas รองเท้า สีฟ้า Size 38',
  description:
    '(ของแท้ 100%) Adidas รองเท้า สีฟ้าอมเทา Size 38 ใช้งานเพียงแค่ 2-3 ครั้ง สภาพใหม่มาก สามารถแชทมาสอบถามเพิ่มเติมได้ครับ',
  price: 1000,
  soldPrice: null,
  stock: 1,
  hidden: false,
  category: [],
  hashtags: [mockHashtag1, mockHashtag2],
  wishlistedBy: [],
  selectedBy: [],
}
const mockProducts = [mockProduct1, mockProduct2]

export function useProducts() {
  const [products] = useQuery(getProducts, {})
  return products
}
