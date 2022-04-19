import {
  BlitzPage,
  invokeWithMiddleware,
  Link,
  PromiseReturnType,
  Routes,
  useMutation,
  useRouter,
} from 'blitz'
import { useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { TopBar } from 'app/core/components/TopBar'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { CardList } from 'app/users/components/CardList'
import destroyCard from 'app/users/mutations/destroyCard'
import getCards from 'app/users/queries/getCards'

interface CardsPageProps {
  cards: PromiseReturnType<typeof getCards>
}

export const CardsPage: BlitzPage<CardsPageProps> = ({ cards }) => {
  const { replace, asPath } = useRouter()
  const [destroyCardMutation] = useMutation(destroyCard)

  const onDestroyCard = useCallback(
    async (cardId: string) => {
      await destroyCardMutation(cardId)
      replace(asPath)
    },
    [destroyCardMutation, replace, asPath]
  )

  return (
    <div>
      <TopBar
        title="My Cards"
        largeTitle
        actions={
          <Link href={Routes.AddCardPage().pathname} passHref>
            <Button as="a" size="small" leftIcon={<FiPlus />}>
              Add
            </Button>
          </Link>
        }
      />
      <CardList cards={cards} onDestroyCard={onDestroyCard} />
    </div>
  )
}

export const getServerSideProps = wrapGetServerSideProps<CardsPageProps>(
  async (context) => {
    const cards = await invokeWithMiddleware(getCards, {}, context)
    return {
      props: { cards },
    }
  }
)

setupAuthRedirect(CardsPage)
setupLayout(CardsPage)

export default CardsPage
