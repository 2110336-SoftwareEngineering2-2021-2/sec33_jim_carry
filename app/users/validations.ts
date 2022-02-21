import cardValidator from 'card-validator'
import { z } from 'zod'

export const CreateAddress = z.object({
  name: z.string().nonempty(),
  receiverName: z.string().nonempty(),
  address: z.string().nonempty(),
  phoneNo: z.string().nonempty(),
  note: z.string().optional(),
})

export const AddCard = z.object({
  cardNumber: z
    .string()
    .transform((value) => ({ value, validation: cardValidator.number(value) }))
    .refine((card) => card.validation.isValid, {
      message: 'Invalid card number',
    }),
  cardHolderName: z
    .string()
    .transform((value) => ({
      value,
      validation: cardValidator.cardholderName(value),
    }))
    .refine((name) => name.validation.isValid, {
      message: 'Invalid cardholder name',
    }),
  expiryDate: z
    .string()
    .transform((value) => ({
      value,
      validation: cardValidator.expirationDate(value),
    }))
    .refine((date) => date.validation.isValid, {
      message: 'Invalid expiry date',
    }),
  cvv: z
    .string()
    .transform((value) => ({ value, validation: cardValidator.cvv(value) }))
    .refine((cvv) => cvv.validation.isValid, {
      message: 'Invalid security code',
    }),
})

export const CardToken = z.string().nonempty()

export const Card = z.object({
  id: z.string().nonempty(),
  brand: z.string().nonempty(),
  name: z.string().nonempty(),
  last_digits: z.string().nonempty(),
})

export const Cards = z.array(Card)
