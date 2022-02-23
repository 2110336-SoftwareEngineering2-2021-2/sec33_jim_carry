import { BlitzPage } from 'blitz'

export function setupAuthRedirect(page: BlitzPage) {
  page.authenticate = true
  page.suppressFirstRenderFlicker = true
}
