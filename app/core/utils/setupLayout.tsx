import { BlitzPage } from 'blitz'

import {
  SecondaryPageLayout,
  SecondaryPageLayoutProps,
} from '../layouts/SecondaryPageLayout'

export function setupLayout(
  page: BlitzPage,
  props: SecondaryPageLayoutProps = {}
) {
  page.getLayout = (page) => (
    <SecondaryPageLayout {...props}>{page}</SecondaryPageLayout>
  )
}
