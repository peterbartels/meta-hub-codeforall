import React, { FunctionComponent } from "react"
import Header from './components/header'
import Footer from './components/footer'
import Profiles from './components/profiles'

import {
  ContentContainer,
  Content
} from './components/styles'

const App: FunctionComponent = () => (
  <div className="App">
    <Header />
    <ContentContainer>
      <Content>
        <Profiles />
      </Content>
    </ContentContainer>
    <Footer />
  </div>
)

export default App
