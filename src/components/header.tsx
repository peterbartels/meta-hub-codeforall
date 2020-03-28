import React, { useCallback, FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useTypewriter from 'react-use-typewriter'
import { useDispatch } from 'react-redux'

import {
  Centered,
  NameContainer,
  Name,
  MenuContainer,
  HeaderContainer,
  Header,
  MenuItem,
  Icons
} from './styles'

const HeaderComponent: FunctionComponent = () => {

  const typerWords = ["Hacking Corona", "An initiative by Dtuch Hack Health"]
  const currentTyperWord = useTypewriter({
    words: typerWords,
    eraseSpeed: 50,
    typeSpeed: 120,
  })

  const dispatch = useDispatch()

  const dispatchStartAddProfile = useCallback(
    () => (dispatch({ type: "EDIT_PROFILE", payload: true })),
    [dispatch]
  );

  return (<>
    <NameContainer>
      <Centered>
        <Name>
          Hacking Corona
        </Name>

        <MenuContainer>
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="home" size="2x" />
            <span>Home</span>
          </MenuItem>
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="user" size="2x" />
            <span>Profile</span>
          </MenuItem>
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="search" size="2x" />
            <span>Search</span>
          </MenuItem>

        </MenuContainer>
      </Centered>
    </NameContainer>
  </>)
}

export default HeaderComponent
