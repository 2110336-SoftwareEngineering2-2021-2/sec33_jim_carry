import { useEffect, useRef } from 'react'

import { ServerEvents } from '../types'
import { useSocketContext } from './SocketProvider'

export function useSocketEvent<K extends keyof ServerEvents>(
  event: K,
  callback: ServerEvents[K]
) {
  const callbackRef = useRef<(...args: any[]) => void>(callback)
  callbackRef.current = callback

  const { socket } = useSocketContext()
  useEffect(() => {
    const listener: ServerEvents[K] = (...args) => {
      return callbackRef.current(...args)
    }
    socket.on(event, listener as any)
    return () => {
      socket.off(event, listener as any)
    }
  }, [socket, event])
}
