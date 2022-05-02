import { Redirect } from 'blitz'

export class RedirectableErorr extends Error {
  constructor(message: string, public readonly redirectTo: Redirect) {
    super(message)
  }
}
