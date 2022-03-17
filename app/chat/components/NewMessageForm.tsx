import { useMutation } from 'blitz'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import Form, { FORM_ERROR } from 'app/core/components/Form'
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
      {focused && <TypingEmitter chatId={chatId} />}
    </Form>
  )
}

function TypingEmitter({ chatId }: { chatId: ChatId }) {
  const { socket, connected } = useSocketContext()
  const { watch } = useFormContext()
  const value = watch('message')
  const hasValue = !!value

  useEffect(() => {
    if (!connected || !hasValue) return
    socket.emit('sendTyping', chatId)
    const interval = setInterval(() => {
      socket.emit('sendTyping', chatId)
    }, 3000)
    return () => clearInterval(interval)
  }, [hasValue, chatId, socket, connected])
  return null
}
