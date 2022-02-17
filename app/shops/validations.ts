import { z } from 'zod'

export const CreateShop = z.object({
  bio: z.string().nonempty(),
  phoneNo: z.string().nonempty(),
  name: z.string().nonempty(),
  citizenId: z.string().nonempty(),
  image: z.string().optional(),
})
