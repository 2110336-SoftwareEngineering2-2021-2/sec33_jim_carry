import { BlitzPage, Routes, useMutation } from 'blitz'
import type { Omise } from 'omise-js-typed'
import {
  OmiseCreateTokenResponse,
  OmiseTokenParameters,
} from 'omise-js-typed/dist/lib/omise'
import { z } from 'zod'

import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import MaskedLabeledTextField from 'app/core/components/MaskedLabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { omisePublicKey } from 'app/core/environment'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import attachCard from 'app/users/mutations/attachCard'
import { AddCard } from 'app/users/validations'

const AddCardPage: BlitzPage = () => {
  const [attachCardMutation] = useMutation(attachCard)
  const goBack = useGoBack(Routes.AddressesPage().pathname)

  return (
    <div>
      <TopBar backHref={Routes.AddressesPage().pathname} title="Add Card" />
      <Form
        className="py-3 px-6 flex flex-col gap-6"
        submitText="Save"
        schema={AddCard}
        onSubmit={async (values: z.infer<typeof AddCard>) => {
          try {
            const omise: Omise = window.Omise
            omise.setPublicKey(omisePublicKey)
            const cardToken = await createCardToken({
              name: values.cardHolderName.value,
              number: values.cardNumber.value,
              expiration_month: parseInt(values.expiryDate.validation.month!),
              expiration_year: parseInt(values.expiryDate.validation.year!),
              security_code: parseInt(values.cvv.value),
            })
            await attachCardMutation(cardToken.id)
            goBack()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <MaskedLabeledTextField
          mask="9999 9999 9999 9999"
          maskChar={null}
          name="cardNumber"
          label="Card number"
        />
        <LabeledTextField name="cardHolderName" label="Cardholder name" />
        <div className="flex gap-6">
          <MaskedLabeledTextField
            mask="99/99"
            name="expiryDate"
            label="Expiry date"
          />
          <LabeledTextField name="cvv" label="Security code" />
        </div>
      </Form>
    </div>
  )
}

async function createCardToken(
  parameters: OmiseTokenParameters
): Promise<OmiseCreateTokenResponse> {
  window.Omise.setPublicKey(omisePublicKey)
  return new Promise((resolve, reject) => {
    window.Omise.createToken(
      'card',
      parameters,
      (status: number, response: OmiseCreateTokenResponse) => {
        if (status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      }
    )
  })
}

setupAuthRedirect(AddCardPage)
setupLayout(AddCardPage)

export default AddCardPage
