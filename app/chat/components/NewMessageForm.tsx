import { useMutation } from 'blitz'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { Divider } from 'app/core/components/Divider'
import Form, {
  CLEAR_FORM,
  FOCUS_FIELD,
  FORM_ERROR,
} from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'

import sendTextMessage from '../mutations/sendTextMessage'
import { useSocketContext } from '../realtime/client/SocketProvider'
import { ChatId } from '../realtime/types'
import { SendMessageForm } from '../realtime/validations'

export interface NewMessageFormProps {
  chatId: ChatId
  onBeforeSend?: () => Promise<void>
}

export function NewMessageForm({ chatId, onBeforeSend }: NewMessageFormProps) {
  const [sendMessageMutation] = useMutation(sendTextMessage)
  const [focused, setFocused] = useState(false)

  return (
    <Form
      schema={SendMessageForm}
      onSubmit={async (values: z.infer<typeof SendMessageForm>) => {
        try {
          if (onBeforeSend) {
            await onBeforeSend()
          }
          await sendMessageMutation({ chatId, message: values.message })
          return { [CLEAR_FORM]: true, [FOCUS_FIELD]: 'message' }
        } catch (error: any) {
          return { [FORM_ERROR]: error.toString() }
        }
      }}
    >
      <Divider dividerColor="bg-sky-lighter" />
      <div className="p-6">
        <LabeledTextField
          className="rounded-full"
          name="message"
          label="Type your message"
          floatingLabel={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <TypingEmitter chatId={chatId} focused={focused} />
    </Form>
  )
}

function TypingEmitter({
  chatId,
  focused,
}: {
  chatId: ChatId
  focused: boolean
}) {
  const { socket, connected } = useSocketContext()
  const { watch } = useFormContext()
  const value = watch('message')
  const hasValue = !!value
  const typing = focused && hasValue

  useEffect(() => {
    if (!connected) return
    if (!typing) {
      socket.emit('sendTyping', chatId, false)
      return
    }
    socket.emit('sendTyping', chatId, true)
    const interval = setInterval(() => {
      socket.emit('sendTyping', chatId, true)
    }, 3000)
    return () => clearInterval(interval)
  }, [typing, chatId, socket, connected])
  return null
}
