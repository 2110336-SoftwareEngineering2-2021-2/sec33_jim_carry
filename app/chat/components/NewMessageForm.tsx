import { useMutation } from 'blitz'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import Form, { CLEAR_FORM, FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'

import sendTextMessage from '../mutations/sendTextMessage'
import { useSocketContext } from '../realtime/client/SocketProvider'
import { ChatId } from '../realtime/types'
import { SendMessageForm } from '../realtime/validations'

export interface NewMessageFormProps {
  chatId: ChatId
}

export function NewMessageForm({ chatId }: NewMessageFormProps) {
  const [sendMessageMutation] = useMutation(sendTextMessage)
  const [focused, setFocused] = useState(false)

  return (
    <Form
      submitText="Send"
      schema={SendMessageForm}
      onSubmit={async (values: z.infer<typeof SendMessageForm>) => {
        try {
          await sendMessageMutation({ chatId, message: values.message })
          return { [CLEAR_FORM]: true }
        } catch (error: any) {
          return { [FORM_ERROR]: error.toString() }
        }
      }}
    >
      <LabeledTextField
        name="message"
        label="Message"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
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
