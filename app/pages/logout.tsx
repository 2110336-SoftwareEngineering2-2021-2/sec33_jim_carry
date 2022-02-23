import { BlitzPage, GetServerSideProps, invokeWithMiddleware } from 'blitz'

import logout from 'app/auth/mutations/logout'
import { Redirect } from 'app/core/components/Redirect'

const LogoutPage: BlitzPage = () => {
  return <Redirect to="/" />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await invokeWithMiddleware(logout, {}, context)
  return {
    props: {},
    redirect: '/',
  }
}

export default LogoutPage
