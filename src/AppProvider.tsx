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
import App from './App';
import rootReducer from './reducers'
import BootstrapProvider from '@bootstrap-styled/provider';

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
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BootstrapProvider theme={{
          '$btn-primary-bg': '#606fc8'
        }}>
          <App />
        </BootstrapProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default AppProvider
