import { Suspense, useState } from "react"
import { BlitzPage, useMutation } from "blitz"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { SegmentedControl, SegmentedControlItem } from "app/core/components/SegmentedControl"
import { Button } from "app/core/components/Button"
import { MainPageLayout } from "app/core/layouts/MainPageLayout"

const Home: BlitzPage = () => {
  return (
    <div className="container font-sans">
      <main>
        <h1 className="title2 my-4">User info</h1>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        <h1 className="title2 my-4">Component demo</h1>
        <SegmentedControlDemo />
        <ButtonsDemo />
      </main>
    </div>
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

Home.authenticate = {
  redirectTo: "/login",
}
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <MainPageLayout title="Home">{page}</MainPageLayout>

export default Home
