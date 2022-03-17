import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  Link,
  PromiseReturnType,
  Routes,
  useMutation,
  useRouter,
} from 'blitz'
import { Suspense, useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { AddressList } from 'app/users/components/AddressList'
import deleteAddress from 'app/users/mutations/deleteAddress'
import getAddresses from 'app/users/queries/getAddresses'

interface AddressesPageProps {
  addresses: PromiseReturnType<typeof getAddresses>
}

export const AddressesPage: BlitzPage<AddressesPageProps> = ({ addresses }) => {
  const { replace, asPath } = useRouter()
  const [deleteAddressMutation] = useMutation(deleteAddress)

  const onDeleteAddress = useCallback(
    async (addressId: number) => {
      await deleteAddressMutation({ id: addressId })
      replace(asPath)
    },
    [deleteAddressMutation, replace, asPath]
  )

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
      <Suspense fallback={<Spinner />}>
        <AddressList addresses={addresses} onDeleteAddress={onDeleteAddress} />
      </Suspense>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  AddressesPageProps
> = async (context) => {
  const addresses = await invokeWithMiddleware(getAddresses, {}, context)
  return {
    props: { addresses },
  }
}

setupAuthRedirect(AddressesPage)
setupLayout(AddressesPage)

export default AddressesPage
