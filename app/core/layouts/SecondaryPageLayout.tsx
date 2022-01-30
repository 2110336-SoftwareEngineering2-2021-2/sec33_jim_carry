import { BlitzLayout } from "blitz"

export const SecondaryPageLayout: BlitzLayout = ({ children }) => {
  return <div className="max-w-[428px] m-auto">{children}</div>
}
