import { PromiseReturnType } from 'blitz'
import { FiMapPin } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import getAddresses from '../queries/getAddresses'

export interface AddressListProps {
  addresses: PromiseReturnType<typeof getAddresses>
  onDeleteAddress: (id: number) => Promise<void>
}

export function AddressList({ addresses, onDeleteAddress }: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <EmptyState
        icon={<FiMapPin strokeWidth={0.5} size={84} />}
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
            if (!confirm('Are you sure you want to delete this address?'))
              return
            await onDeleteAddress(address.id)
          }}
          key={address.id}
          className="
            flex flex-col gap-1 px-6 py-3
            transition-colors
            hover:bg-sky-light/30 active:bg-sky-light/70
          "
        >
          <p className="text-regular leading-tight font-regular text-ink-darkest">
            {address.name}
          </p>
          <p className="text-small leading-tight font-regular text-ink-lighter">
            {address.address}
          </p>
        </div>
      ))}
    </>
  )
}
