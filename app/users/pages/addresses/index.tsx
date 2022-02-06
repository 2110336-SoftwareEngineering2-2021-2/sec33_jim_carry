import { TopBar } from "app/core/components/TopBar"
import { TopBarAction } from "app/core/components/TopBarAction"
import { setupAuthRedirect } from "app/core/utils/setupAuthRedirect"
import { setupLayout } from "app/core/utils/setupLayout"
import { AddressList } from "app/users/components/AddressList"
import { BlitzPage, Link, Routes } from "blitz"
import { Suspense } from "react"
import { FiPlus } from "react-icons/fi"

export const AddressesPage: BlitzPage = () => {
  return (
    <div>
      <TopBar
        title="Addresses"
        largeTitle
        actions={
          <Link href={Routes.CreateAddressPage().pathname} passHref>
            <TopBarAction as="a">
              <FiPlus />
            </TopBarAction>
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
