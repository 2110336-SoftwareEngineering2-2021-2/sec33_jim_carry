import { ChatMemberType } from '@prisma/client'
import { useState } from 'react'

import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { countLabel } from 'app/core/utils/countLabel'

import { ChatData } from '../queries/listChats'
import { ChatList } from './ChatList'

export interface SellerChatListProps {
  buyerChats: ChatData[]
  sellerChats: ChatData[]
  userId: number
}

export function SellerChatList({
  buyerChats,
  sellerChats,
  userId,
}: SellerChatListProps) {
  const [page, setPage] = useState<ChatMemberType>('BUYER')
  return (
    <div>
      <div className="px-6 pt-6">
        <SegmentedControl value={page} onChange={(value) => setPage(value)}>
          <SegmentedControlItem value="BUYER">
            {countLabel('Normal chat', buyerChats.length)}
          </SegmentedControlItem>
          <SegmentedControlItem value="SELLER">
            {countLabel('Shop chat', sellerChats.length)}
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
      {page === 'BUYER' && <ChatList chats={buyerChats} userId={userId} />}
      {page === 'SELLER' && <ChatList chats={sellerChats} userId={userId} />}
    </div>
  )
}
