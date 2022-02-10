import { useMutation, useQuery } from "blitz"
import { FiMapPin } from "react-icons/fi"

import { EmptyState } from "app/core/components/EmptyState"

import deleteAddress from "../mutations/deleteAddress"
import getAddresses from "../queries/getAddresses"

export function AddressList() {
  const [addresses, { refetch }] = useQuery(getAddresses, null)
  const [deleteAddressMutation] = useMutation(deleteAddress)

  if (addresses.length === 0) {
    return (
      <EmptyState
        icon={<FiMapPin />}
        title="You don't have a saved address."
        description="Add your addresses here for a quicker checkout experience."
      />
    )
  }
  return (
    <>
      {addresses.map((address) => (
        <div
          onClick={async () => {
            if (!confirm("Are you sure you want to delete this address?")) return
            await deleteAddressMutation({ id: address.id })
            await refetch()
          }}
          key={address.id}
          className="
            flex flex-col gap-1 px-6 py-3
            transition-colors
            hover:bg-sky-light/30 active:bg-sky-light/70
          "
        >
          <p className="text-regular leading-tight font-regular text-ink-darkest">{address.name}</p>
          <p className="text-small leading-tight font-regular text-ink-lighter">
            {address.address}
          </p>
        </div>
      ))}
    </>
  )
}
