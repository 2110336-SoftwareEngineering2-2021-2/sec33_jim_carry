import { BlitzLayout, Head } from 'blitz'
import { CSSProperties } from 'react'

import { Container } from '../components/Container'
import { variant } from '../utils/variant'

export interface SecondaryPageLayoutProps {
  title?: string
  fillHeight?: boolean
}

const fillHeightStyles: CSSProperties = {
  height: '100vh',
  maxHeight: '-webkit-fill-available',
}

export const SecondaryPageLayout: BlitzLayout<SecondaryPageLayoutProps> = ({
  children,
  ...props
}) => {
  const { title, fillHeight = false } = props
  return (
    <>
      <Head>
        <title>{title ?? 'MayDay'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        style={fillHeight ? fillHeightStyles : undefined}
        className={`${variant(fillHeight, `flex flex-col`)}`}
      >
        {children}
      </Container>
    </>
  )
}
