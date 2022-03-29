import { useEffect, useState } from 'react'

import { ChatId } from '../types'
import { useObservationContext } from './ObservationManager'

export function useObserveChat(ids: ChatId[]) {
  const { addRequest, removeRequest } = useObservationContext()
  const [stringifiedIds, setStringifiedIds] = useState(() =>
    JSON.stringify(ids)
  )

  useEffect(() => {
    setStringifiedIds(JSON.stringify(ids))
  }, [ids])

  useEffect(() => {
    const ids = JSON.parse(stringifiedIds) as ChatId[]
    addRequest(ids)
    return () => removeRequest(ids)
  }, [addRequest, removeRequest, stringifiedIds])
}
