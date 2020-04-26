import React, { useCallback, FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

import { useAuth0 } from "../auth/auth0";

import {
  NameContainer,
  Name,
  MenuContainer,
  MenuItem,
} from './styles'

const HeaderComponent: FunctionComponent = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0() as any; //no typings for auth0 at the moment

  const dispatch = useDispatch()

  const dispatchStartAddProfile = useCallback(
    () => (dispatch({ type: "EDIT_PROFILE", payload: true })),
    [dispatch]
  );

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (<>
    <NameContainer>
      <Name>
        <FontAwesomeIcon icon="heart" size="2x" color="#0289C8" /><span>Health Hacker Hub</span>
      </Name>

      <MenuContainer>
        <Link to="/home">
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="home" size="2x" color="#0289C8" />
            <span>Home</span>
          </MenuItem>
        </Link>
        {isAuthenticated && (
          <Link to="/my-profile">
            <MenuItem onClick={dispatchStartAddProfile}>
              <FontAwesomeIcon icon="user" size="2x" color="#0289C8" />
              <span>My Profile</span>
            </MenuItem>
          </Link>
        )}
        <Link to="/profiles">
          <MenuItem onClick={dispatchStartAddProfile}>
            <FontAwesomeIcon icon="user-cog" size="2x" color="#0289C8" />
            <span>Hackers</span>
          </MenuItem>
        </Link>
        <Link to="/organisations">
          <MenuItem>
            <FontAwesomeIcon icon="building" size="2x" color="#0289C8" />
            <span>Organisations</span>
          </MenuItem>
        </Link>
        {!isAuthenticated && (
          <MenuItem onClick={() => loginWithRedirect({})}>
            <FontAwesomeIcon icon="user-cog" size="2x" color="#0289C8" />
            <span>Login</span>
          </MenuItem>
        )}
        {isAuthenticated && (
          <MenuItem onClick={() => logoutWithRedirect()}>
            <FontAwesomeIcon icon="user-cog" size="2x" color="#0289C8" />
            <span>Logout</span>
          </MenuItem>
        )}
      </MenuContainer>
    </NameContainer>
  </>)
}

export default HeaderComponent
