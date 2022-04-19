import { BlitzPage, invokeWithMiddleware } from 'blitz'

import logout from 'app/auth/mutations/logout'
import { Redirect } from 'app/core/components/Redirect'
import { wrapGetServerSideProps } from 'app/core/utils'

const LogoutPage: BlitzPage = () => {
  return <Redirect to="/" />
}

export const getServerSideProps = wrapGetServerSideProps(async (context) => {
  await invokeWithMiddleware(logout, {}, context)
  return {
    props: {},
    redirect: '/',
  }
})

export default LogoutPage
