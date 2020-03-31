import React, { FunctionComponent } from "react"

import {
  FooterContainer,
  Footer
} from '../components/styles'

const FooterComponent: FunctionComponent = () => {

  return (
    <FooterContainer>
      <Footer>
        Privacy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sponsors&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This platform is the result of our teameffort at de Hack Corona hackaton hosted from 27-31 march 2020 by Dutch Hacking Health.
      </Footer>
    </FooterContainer >
  )
}

export default FooterComponent
