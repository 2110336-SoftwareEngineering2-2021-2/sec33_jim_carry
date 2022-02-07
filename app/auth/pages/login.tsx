import { useRouter, BlitzPage } from "blitz"
import Image from "next/image"

import { setupLayout } from "app/core/utils/setupLayout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
  const loginUrl = `/api/auth/google?redirectUrl=${encodeURIComponent(next)}`

  return (
    <div className="p-6 pt-16">
      <Image src="/images/logo_vertical.svg" width={106} height={96} alt="MayDay" />
      <div className="py-3 gap-2">
        <h3 className="title3">Welcome to MayDay</h3>
        <p className="text-regular leading-normal font-regular text-ink-darkest">
          Sign in to check out your items.
        </p>
      </div>
      <div className="py-3">
        <a
          className="
            h-12 px-[52px] rounded-lg ring-1 ring-inset ring-sky-light
            flex items-center justify-center relative
            font-sans text-regular leading-none font-medium text-ink-darkest
            transition
            hover:ring-sky-base
            active:scale-95
          "
          href={loginUrl}
        >
          <span className="h-5 absolute left-4">
            <Image src="/images/google.svg" width={20} height={20} alt="" />
          </span>
          Continue with Google
        </a>
      </div>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
setupLayout(LoginPage)

export default LoginPage
