import React, { useState, useCallback, FunctionComponent } from "react"
import { useTranslation } from "react-i18next";
import i18n from '../i18n';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux'
import { useAuth0 } from "../auth/auth0";

import {
  Nav,
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse
} from '@bootstrap-styled/v4';
import { Link } from "react-router-dom";

const HeaderComponent: FunctionComponent = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0() as any; //no typings for auth0 at the moment
  const { t } = useTranslation('translations', { i18n });
  const [navOpen, toggleBurger] = useState(false)
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
    <Navbar color="faded" light toggleable="md">
      <Container>
        <div className="d-flex justify-content-between">
          <NavbarBrand>
            <FontAwesomeIcon icon="heart" size="1x" color="#0289C8" /><div>{t('header.title')}</div>
          </NavbarBrand>
          <NavbarToggler onClick={() => toggleBurger(!navOpen)}/>
        </div>
        <Collapse navbar isOpen={navOpen} className="justify-content-end">
          <Nav navbar>
            <NavItem onClick={dispatchStartAddProfile}>
              <Link className="nav-link" to="/home">
                <FontAwesomeIcon icon="home" size="1x" color="#0289C8" />
                <div>{t('header.home')}</div>
              </Link>
            </NavItem>
            {isAuthenticated && (
              <NavItem onClick={dispatchStartAddProfile}>
                <Link className="nav-link" to="/my-profile">
                  <FontAwesomeIcon icon="user" size="1x" color="#0289C8" />
                  <div>{t('header.profile')}</div>
                </Link>
              </NavItem>
            )}
            <NavItem onClick={dispatchStartAddProfile}>
              <Link className="nav-link" to="/profiles">
                <FontAwesomeIcon icon="user-cog" size="1x" color="#0289C8" />
                <div>{t('general.people')}</div>
              </Link>
            </NavItem>
            <NavItem onClick={dispatchStartAddProfile}>
              <Link className="nav-link" to="/organisations">
                <FontAwesomeIcon icon="building" size="1x" color="#0289C8" />
                <div>{t('general.organisations')}</div>
              </Link>
            </NavItem>
            {!isAuthenticated && (
              <NavItem>
                <NavLink onClick={() => loginWithRedirect({})}>
                  <FontAwesomeIcon icon={faSignInAlt} size="1x" color="#0289C8" />
                  <div>{t('header.login')}</div>
                </NavLink>
              </NavItem>
            )}
            {isAuthenticated && (
              <NavItem>
                <NavLink onClick={() => logoutWithRedirect()}>
                  <FontAwesomeIcon icon={faSignOutAlt} size="1x" color="#0289C8" />
                  <div>{t('header.logout')}</div>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  </>)
}

export default HeaderComponent
