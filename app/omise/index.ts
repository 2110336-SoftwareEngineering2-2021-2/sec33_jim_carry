import { NotFoundError } from 'blitz'
import db from 'db'
import omiseBuilder from 'omise'

import { omisePublicKey, omiseSecretKey } from 'app/core/environment'

export const omise = omiseBuilder({
  publicKey: omisePublicKey,
  secretKey: omiseSecretKey,
})

export async function getCustomer(userId: number) {
  const user = await db.user.findFirst({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      omiseId: true,
    },
  })
  if (user === null) {
    throw new NotFoundError()
  }

  if (user.omiseId !== null) {
    return await omise.customers.retrieve(user.omiseId)
  } else {
    const customer = await omise.customers.create({
      email: user.email,
      description: user.name ?? 'No name',
    })
    await db.user.update({
      where: { id: userId },
      data: {
        omiseId: customer.id,
      },
    })
    return customer
  }
}
