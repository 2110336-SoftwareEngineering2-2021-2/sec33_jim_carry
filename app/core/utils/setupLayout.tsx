import { BlitzPage } from "blitz"

import { SecondaryPageLayout } from "../layouts/SecondaryPageLayout"

export function setupLayout(page: BlitzPage) {
  page.getLayout = (page) => <SecondaryPageLayout>{page}</SecondaryPageLayout>
}
