import { BlitzPage, Link, Routes } from "blitz"
import { Suspense } from "react"
import { FiPlus } from "react-icons/fi"

import { Button } from "app/core/components/Button"
import { TopBar } from "app/core/components/TopBar"
import { TopBarAction } from "app/core/components/TopBarAction"
import { setupAuthRedirect } from "app/core/utils/setupAuthRedirect"
import { setupLayout } from "app/core/utils/setupLayout"
import { AddressList } from "app/users/components/AddressList"

export const AddressesPage: BlitzPage = () => {
  return (
    <div>
      <TopBar
        title="My Addresses"
        largeTitle
        actions={
          <Link href={Routes.CreateAddressPage().pathname} passHref>
            <Button as="a" size="small" leftIcon={<FiPlus />}>
              Add
            </Button>
          </Link>
        }
      />
      <Suspense fallback={null}>
        <AddressList />
      </Suspense>
    </div>
  )
}

setupAuthRedirect(AddressesPage)
setupLayout(AddressesPage)

export default AddressesPage
