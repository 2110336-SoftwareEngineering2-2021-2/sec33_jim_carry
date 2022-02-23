import { useRouter, BlitzPage } from 'blitz'
import Image from 'next/image'

import { setupLayout } from 'app/core/utils/setupLayout'

import { LoginButton } from '../components/LoginButton'

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const next = router.query.next
    ? decodeURIComponent(router.query.next as string)
    : '/'

  return (
    <div className="p-6 pt-16">
      <Image
        src="/images/logo_vertical.svg"
        width={106}
        height={96}
        alt="MayDay"
      />
      <div className="py-3 gap-2">
        <h3 className="title3">Welcome to MayDay</h3>
        <p className="text-regular leading-normal font-regular text-ink-darkest">
          Sign in to check out your items.
        </p>
      </div>
      <div className="py-3">
        <LoginButton next={next} />
      </div>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = '/'
setupLayout(LoginPage)

export default LoginPage
