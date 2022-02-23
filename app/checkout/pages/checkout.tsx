import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
  Routes,
  useMutation,
  useRouter,
} from 'blitz'
import { Card } from 'omise-js-typed/dist/lib/omise'
import { Fragment, useState } from 'react'
import { FiCreditCard } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { Divider } from 'app/core/components/Divider'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

import { CheckoutGroup } from '../components/CheckoutGroup'
import { SelectSection } from '../components/SelectSection'
import confirmCheckout from '../mutations/confirmCheckout'
import getCheckoutSummary from '../queries/getCheckoutSummary'

interface CheckoutProps {
  summary: PromiseReturnType<typeof getCheckoutSummary>
}

const CheckoutPage: BlitzPage<CheckoutProps> = ({ summary }) => {
  const { addresses, itemIds, groups, cards, totalPrice } = summary
  const [addressId, setAddressId] = useState(addresses[0]?.id)
  const [cardId, setCardId] = useState(cards[0]?.id)

  const addressIdIsValid = addresses.some((address) => address.id === addressId)
  const cardIdIsValid = cards.some((card) => card.id === cardId)

  const [confirmCheckoutMutation, { isLoading }] = useMutation(confirmCheckout)

  const { replace } = useRouter()

  const onCheckout = async () => {
    await confirmCheckoutMutation({
      addressId: addressId!,
      cardId: cardId!,
      itemIds,
    })
    await replace(Routes.OrdersPage().pathname)
  }

  return (
    <div>
      <TopBar
        backHref={Routes.ShoppingCart().pathname}
        title="Checkout"
        largeTitle
      />
      <div className="flex flex-col py-3 gap-6">
        <SelectSection
          sectionName="Ship to"
          items={addresses}
          value={addressId}
          onChange={setAddressId}
          title="Addresses"
          description="Select an address to use for this order."
          getLabel={(address) => address.name}
          addText="Add address"
          addLink={Routes.CreateAddressPage().pathname}
        >
          {(address) => (
            <div className="flex-1 text-regular leading-normal font-regular text-ink-darkest">
              <p>{`${address.receiverName} | ${address.phoneNo}`}</p>
              <p>{address.address}</p>
            </div>
          )}
        </SelectSection>
        <Divider />
        {groups.map((group) => (
          <Fragment key={group.shop.id}>
            <CheckoutGroup group={group} />
            <Divider />
          </Fragment>
        ))}
        <SelectSection
          sectionName="Payment"
          items={cards}
          value={cardId}
          onChange={setCardId}
          title="Payment Cards"
          description="Select a card to use for this order."
          getLabel={(card) => <CardLabel card={card} />}
          addText="Add card"
          addLink={Routes.AddCardPage().pathname}
        >
          {(card) => (
            <div
              className="
                flex-1 flex gap-3 items-center
                text-regular leading-normal font-regular text-ink-darkest
              "
            >
              <FiCreditCard className="text-[24px]" />
              <CardLabel card={card} />
            </div>
          )}
        </SelectSection>
        <div className="px-6">
          <Button
            onClick={onCheckout}
            fullWidth
            disabled={isLoading || !addressIdIsValid || !cardIdIsValid}
          >{`Pay ฿${totalPrice}`}</Button>
        </div>
      </div>
    </div>
  )
}

function CardLabel({ card }: { card: Pick<Card, 'brand' | 'last_digits'> }) {
  return (
    <p>
      {card.brand}
      <span className="font-mono">{` •••• ${card.last_digits}`}</span>
    </p>
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
