import Image from 'next/image'

export interface LoginButtonProps {
  next?: string
}

export function LoginButton({ next }: LoginButtonProps) {
  const loginUrl = `/api/auth/google?redirectUrl=${encodeURIComponent(
    next ?? '/'
  )}`

  return (
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
  )
}
