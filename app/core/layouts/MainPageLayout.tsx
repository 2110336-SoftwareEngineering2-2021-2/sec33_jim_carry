import { Head, BlitzLayout } from "blitz"
import { SecondaryPageLayout } from "./SecondaryPageLayout"

interface MainPageLayoutProps {
  title: string
}

export const MainPageLayout: BlitzLayout<MainPageLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "MayDay"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SecondaryPageLayout>{children}</SecondaryPageLayout>
    </>
  )
}
