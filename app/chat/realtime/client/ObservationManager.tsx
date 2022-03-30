import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ChatId } from '../types'
import { useSocketContext } from './SocketProvider'

export type ObservationRequest = ChatId[]

interface ObservationContextValue {
  addRequest: (request: ObservationRequest) => void
  removeRequest: (request: ObservationRequest) => void
}

const defaultValue: ObservationContextValue = {
  addRequest: () => {
    throw new Error('Not implemented')
  },
  removeRequest: () => {
    throw new Error('Not implemented')
  },
}

const ObservationContext = createContext<ObservationContextValue>(defaultValue)

export function useObservationContext() {
  return useContext(ObservationContext)
}

export function ObservationProvider({ children }: PropsWithChildren<{}>) {
  const { socket, connected } = useSocketContext()
  const [requests, setRequests] = useState<ObservationRequest[]>([])

  useEffect(() => {
    if (!connected) return
    const request = mergeRequests(requests)
    socket.emit('observeChats', request)
  }, [socket, connected, requests])

  const addRequest = useCallback((request: ObservationRequest) => {
    setRequests((requests) => {
      if (requests.includes(request)) {
        return requests
      }
      return [...requests, request]
    })
  }, [])

  const removeRequest = useCallback((request: ObservationRequest) => {
    setRequests((requests) => requests.filter((r) => r !== request))
  }, [])

  return (
    <ObservationContext.Provider value={{ addRequest, removeRequest }}>
      {children}
    </ObservationContext.Provider>
  )
}

function mergeRequests(requests: ObservationRequest[]): ObservationRequest {
  const allIds = new Set<ChatId>()
  requests.forEach((request) => {
    request.forEach((id) => allIds.add(id))
  })
  const result: ChatId[] = []
  allIds.forEach((id) => result.push(id))
  return result
}
