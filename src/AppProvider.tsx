import React, { FunctionComponent } from "react"
import './App.css';
import { ThemeProvider } from '@xstyled/styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCheckSquare,
  faPlus,
  faUser,
  faSearch,
  faHome,
  faHeart,
  faBuilding,
  faUserCog,
  faClock
} from '@fortawesome/free-solid-svg-icons'
//TODO: add Fontawesome icons: import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import BootstrapProvider from '@bootstrap-styled/provider';
import config from './auth_config.json';
import App from './App';
import rootReducer from './reducers'
import { Auth0Provider } from "./auth/auth0";
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


const store = createStore(rootReducer as any)
library.add(
  fab,
  faCheckSquare,
  faPlus,
  faUser,
  faSearch,
  faHome,
  faHeart,
  faBuilding,
  faUserCog,
  faClock
)

const theme = {
  colors: {
    primary: '#bd4932',
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  }
}

const AppProvider: FunctionComponent = ({ children }) => {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <BootstrapProvider theme={{
            '$btn-primary-bg': '#0289C8'
          }}>
            <App />
          </BootstrapProvider>
        </ThemeProvider>
      </ReduxProvider>
    </Auth0Provider>
  );
}

export default AppProvider
