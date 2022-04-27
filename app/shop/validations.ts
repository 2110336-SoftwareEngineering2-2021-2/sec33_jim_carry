import { z } from 'zod'

const invalidCitizenId = 'Invalid Citizen ID'

export const CreateShop = z.object({
  bio: z.string().nonempty(),
  phoneNo: z.string().nonempty(),
  name: z.string().nonempty(),
  citizenId: z
    .string()
    .length(13, invalidCitizenId)
    .regex(/^[0-9]{13}$/, invalidCitizenId)
    .refine(checkCitizenId, invalidCitizenId),
  image: z.string().optional(),
})

function checkCitizenId(id: string) {
  let sum = 0
  for (let i = 0, sum = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i)
  }
  const mod = sum % 11
  const check = (11 - mod) % 10
  if (check == parseInt(id.charAt(12))) {
    return true
  }
  return false
}
