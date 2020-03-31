import React, { FunctionComponent } from "react"
import {
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

import Header from './components/header'
import Home from './components/home'
import Organisations from './components/organisations'
import MyProfile from './components/myProfile'
import Footer from './components/footer'
import Profiles from './components/profiles'
import {
  ContentContainer,
  Content
} from './components/styles'

const App: FunctionComponent = () => (
  <HashRouter>
    <div className="App">
      <Header />
      <ContentContainer>
        <Content>
          <Switch>
            <Route path="/profiles" component={Profiles} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/organisations" component={Organisations} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
      </ContentContainer>
      <Footer />
    </div>
  </HashRouter>
)

export default App
