import { BlitzLayout } from 'blitz'
import { CSSProperties } from 'react'

import { Container } from '../components/Container'
import { variant } from '../utils/variant'

export interface SecondaryPageLayoutProps {
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
  const { fillHeight = false } = props
  return (
    <Container
      style={fillHeight ? fillHeightStyles : undefined}
      className={`${variant(fillHeight, `flex flex-col`)}`}
    >
      {children}
    </Container>
  )
}
