import { z } from "zod"

export const CreateAddress = z.object({
  name: z.string().nonempty(),
  receiverName: z.string().nonempty(),
  address: z.string().nonempty(),
  phoneNo: z.string().nonempty(),
  note: z.string().optional(),
})
