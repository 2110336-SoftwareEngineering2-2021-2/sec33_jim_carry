import { BlitzPage } from "blitz"

export function setupAuthRedirect(page: BlitzPage) {
  page.authenticate = {
    redirectTo: "/login",
  }
  page.suppressFirstRenderFlicker = true
}
