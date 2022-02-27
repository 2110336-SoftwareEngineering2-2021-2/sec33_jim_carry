import { BlitzPage, Link, Routes } from 'blitz'

import { Button } from 'app/core/components/Button'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

const FinishWithdrawalPage: BlitzPage = () => {
  return (
    <div>
      <TopBar title="Withdrawal Complete" largeTitle />
      <div className="px-6 mb-3">
        <p>You can verify the wihdrawal in transaction history</p>
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

setupAuthRedirect(FinishWithdrawalPage)
setupLayout(FinishWithdrawalPage)
export default FinishWithdrawalPage
