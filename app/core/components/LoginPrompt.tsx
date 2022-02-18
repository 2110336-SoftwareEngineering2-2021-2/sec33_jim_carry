import { useRouter } from 'blitz'

import { LoginButton } from 'app/auth/components/LoginButton'

import { useLoginPromptStore } from '../stores/LoginPromptStore'
import { Popover, PopoverText, PopoverTitle } from './Popover'

export function LoginPrompt() {
  const { isOpen, message, close } = useLoginPromptStore((state) => ({
    isOpen: state.isOpen,
    message: state.message,
    close: state.close,
  }))
  const { asPath } = useRouter()
  return (
    <Popover isOpen={isOpen} onClose={close}>
      <div className="flex flex-col items-center py-6 gap-6">
        <div className="flex flex-col px-6 gap-2 text-center">
          <PopoverTitle>Sign in</PopoverTitle>
          <PopoverText>{message}</PopoverText>
        </div>
        <LoginButton next={asPath} />
      </div>
    </Popover>
  )
}
