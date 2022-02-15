import { BlitzPage, Image, Link, Routes } from 'blitz'

import { Button } from 'app/core/components/Button'
import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

const FinishRegisterPage: BlitzPage = () => {
  const goBack = useGoBack(Routes.Menu().pathname)
  return (
    <div>
      <TopBar title="Register Complete" largeTitle />
      <div className="px-6 mb-3">
        <p>Our team will verify you as soon as possible.</p>
        <p>We’ll notify you when that happens!</p>
      </div>
      <div className="px-6 my-8">
        <Link href={Routes.Menu().pathname} passHref>
          <Button as="a" type="submit" fullWidth>
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
