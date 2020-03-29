import React, { useCallback, FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useTypewriter from 'react-use-typewriter'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

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
      <Name>
        <FontAwesomeIcon icon="heart" size="2x" /><span>Health Hackers Hub</span>
      </Name>

      <MenuContainer>
        <Link to="/home">
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="home" size="2x" />
            <span>Home</span>
          </MenuItem>
        </Link>
        <Link to="/my-profile">
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="user" size="2x" />
            <span>My Profile</span>
          </MenuItem>
        </Link>
        <Link to="/profiles">
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="search" size="2x" />
            <span>Search</span>
          </MenuItem>
        </Link>
      </MenuContainer>
    </NameContainer>
  </>)
}

export default HeaderComponent
