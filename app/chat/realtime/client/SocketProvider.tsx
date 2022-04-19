import { useSession } from 'blitz'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

import * as parser from 'app/core/utils/superjsonParser'

import { ClientEvents, ServerEvents } from '../types'

export type SocketState = 'connected' | 'disconnected' | 'error'

interface SocketContextValue {
  state: SocketState
  connected: boolean
  socket: Socket<ServerEvents, ClientEvents>
}

const SocketContext = createContext<SocketContextValue>(
  null as unknown as SocketContextValue
)

export function useSocketContext() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }: PropsWithChildren<{}>) {
  const [state, setState] = useState<SocketState>('disconnected')
  const [connected, setConnected] = useState(false)
  const [socket] = useState(
    () =>
      io({
        auth: {},
        parser,
      }) as Socket<ServerEvents, ClientEvents>
  )
  const { userId } = useSession({ suspense: false })

  useEffect(() => {
    setConnected(socket.connected)

    socket.on('connect', () => {
      setState('connected')
      setConnected(true)
    })

    socket.on('connect_error', () => {
      setState('error')
      setConnected(false)
    })

    socket.on('disconnect', () => {
      setState('disconnected')
      setConnected(false)
    })

    return () => {
      socket.close()
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ state, connected, socket }}>
      {children}
    </SocketContext.Provider>
  )
}
