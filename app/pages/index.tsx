import { BlitzPage, Image, useMutation } from 'blitz'
import { Suspense, useState } from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { RiHeartLine, RiHeartFill } from 'react-icons/ri'

import logout from 'app/auth/mutations/logout'
import { Button } from 'app/core/components/Button'
import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { TextField } from 'app/core/components/TextField'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { useProducts } from 'app/core/hooks/useProducts'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'

const Home: BlitzPage = () => {
  return (
    <div className="container font-sans">
      <main>
        {/* <h1 className="title2 my-4">User info</h1> */}
        <Suspense fallback="Loading...">
          {/* <UserInfo /> */}
          <Products />
        </Suspense>
        <h1 className="title2 my-4">Component demo</h1>
        <SegmentedControlDemo />
        <ButtonsDemo />
        <div className="flex flex-col gap-4">
          <TextField placeholder="Text Field" />
          <TextField placeholder="Disabled Text Field" disabled />
          <TextField placeholder="Error" hasError />
        </div>
      </main>
    </div>
  )
}

function Products() {
  const { products } = useProducts()
  return (
    <div className="p-6 flex flex-col space-y-6">
      <TextField placeholder="Search" className="w-full" />
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  )
}

function Product({ product }) {
  const liked = true
  return (
    <a className="flex-col space-y-3">
      {/* Note: you can override to different aspect-ratio */}
      <div className="w-full relative aspect-video bg-gradient-to-r from-cyan-500 to-blue-500">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-col">
        <span className="bold">{product.name}</span>
        <div className="flex justify-between items-center">
          <span className="title3 font-sans text-primary-dark">{`฿${product.price}`}</span>
          <div className="flex">
            <Button iconOnly buttonType="transparent">
              <FiMessageCircle />
            </Button>
            <Button iconOnly buttonType="transparent">
              {liked ? <RiHeartFill /> : <RiHeartLine />}
            </Button>
          </div>
        </div>
        <span className="font-regular text-tiny text-ink-light">
          {/* {JSON.stringify(product)} */}
          {/* {`1h ago · by ${product.shop}`} */}
        </span>
      </div>
    </a>
  )
}
function UserInfo() {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div className="flex gap-4">
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
      </div>
    )
  } else {
    return <div>Redirecting to login page...</div>
  }
}

function SegmentedControlDemo() {
  const [value, setValue] = useState(1)
  return (
    <SegmentedControl value={value} onChange={(newValue) => setValue(newValue)}>
      <SegmentedControlItem value={1}>Segment 1</SegmentedControlItem>
      <SegmentedControlItem value={2}>Segment 2</SegmentedControlItem>
      <SegmentedControlItem value={3}>Segment 3</SegmentedControlItem>
      <SegmentedControlItem value={4}>Segment 4</SegmentedControlItem>
    </SegmentedControl>
  )
}

function ButtonsDemo() {
  return (
    <div className="my-3 flex flex-col gap-3">
      <div className="flex gap-3">
        <Button>Primary</Button>
        <Button buttonType="secondary">Secondary</Button>
        <Button buttonType="outline">Outline</Button>
        <Button buttonType="transparent">Transparent</Button>
      </div>
      <div className="flex gap-3">
        <Button disabled>Primary</Button>
        <Button buttonType="secondary" disabled>
          Secondary
        </Button>
        <Button buttonType="outline" disabled>
          Outline
        </Button>
        <Button buttonType="transparent" disabled>
          Transparent
        </Button>
      </div>
    </div>
  )
}

setupAuthRedirect(Home)
Home.getLayout = (page) => <MainPageLayout title="Home">{page}</MainPageLayout>

export default Home
