import { BlitzPage, Link, Routes, useRouter } from 'blitz'

import { Button } from 'app/core/components/Button'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

const FinishRegisterPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <div>
      <TopBar
        title="Register Complete"
        largeTitle
        onBack={() => router.push(Routes.Menu())}
      />
      <div className="px-6 mb-3">
        <p>Our team will verify you as soon as possible.</p>
        <p>We’ll notify you when that happens!</p>
      </div>
      <div className="px-6 my-8">
        <Link href={Routes.Menu().pathname} passHref>
          <Button as="a" fullWidth>
            Back to Browsing
          </Button>
        </Link>
      </div>
    </div>
  )
}

setupAuthRedirect(FinishRegisterPage)
setupLayout(FinishRegisterPage)
export default FinishRegisterPage
