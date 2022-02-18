import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
  Routes,
} from 'blitz'
import { Fragment } from 'react'
import { FiCreditCard } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { Divider } from 'app/core/components/Divider'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

import { CheckoutGroup } from '../components/CheckoutGroup'
import { SelectSection } from '../components/SelectSection'
import getCheckoutSummary from '../queries/getCheckoutSummary'

interface CheckoutProps {
  summary: PromiseReturnType<typeof getCheckoutSummary>
}

const CheckoutPage: BlitzPage<CheckoutProps> = ({ summary }) => {
  const { addresses, groups, cards, totalPrice } = summary

  const addressId = addresses[0]?.id
  const cardId = cards[0]?.id

  const selectedAddress = addresses.find((address) => address.id === addressId)
  const selectedCard = cards.find((card) => card.id === cardId)

  if (typeof window !== 'undefined') {
    console.log(JSON.stringify(summary, null, 2))
  }

  return (
    <div>
      <TopBar
        backHref={Routes.ShoppingCart().pathname}
        title="Checkout"
        largeTitle
      />
      <div className="flex flex-col py-3 gap-6">
        <SelectSection sectionName="Ship to">
          <div className="flex-1 text-regular leading-normal font-regular text-ink-darkest">
            {selectedAddress ? (
              <>
                <p>{`${selectedAddress.receiverName} | ${selectedAddress.phoneNo}`}</p>
                <p>{selectedAddress.address}</p>
              </>
            ) : (
              'Add address'
            )}
          </div>
        </SelectSection>
        <Divider />
        {groups.map((group) => (
          <Fragment key={group.shop.id}>
            <CheckoutGroup group={group} />
            <Divider />
          </Fragment>
        ))}
        <SelectSection sectionName="Payment">
          <div
            className="
              flex-1 flex gap-3 items-center
              text-regular leading-normal font-regular text-ink-darkest"
          >
            {selectedCard ? (
              <>
                <FiCreditCard className="text-[24px]" />
                <p>{`${selectedCard.brand} •••• ${selectedCard.last_digits}`}</p>
              </>
            ) : (
              'Add card'
            )}
          </div>
        </SelectSection>
        <div className="px-6">
          <Button
            fullWidth
            disabled={!selectedAddress || !selectedCard}
          >{`Pay ฿${totalPrice}`}</Button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<CheckoutProps> = async (
  context
) => {
  const summary = await invokeWithMiddleware(getCheckoutSummary, {}, context)
  return {
    props: { summary },
  }
}

setupAuthRedirect(CheckoutPage)
setupLayout(CheckoutPage)

export default CheckoutPage
