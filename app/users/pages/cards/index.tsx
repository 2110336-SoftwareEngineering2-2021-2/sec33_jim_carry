import { BlitzPage, Link, Routes } from 'blitz'
import { Suspense } from 'react'
import { FiPlus } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { CardList } from 'app/users/components/CardList'

export const CardsPage: BlitzPage = () => {
  return (
    <div>
      <TopBar
        title="My Cards"
        largeTitle
        actions={
          <Link href={Routes.AddCardPage().pathname} passHref>
            <Button as="a" size="small" leftIcon={<FiPlus />}>
              Add
            </Button>
          </Link>
        }
      />
      <Suspense fallback={null}>
        <CardList />
      </Suspense>
    </div>
  )
}

setupAuthRedirect(CardsPage)
setupLayout(CardsPage)

export default CardsPage
