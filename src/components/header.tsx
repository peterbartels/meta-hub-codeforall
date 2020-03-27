import React, { useCallback, FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useTypewriter from 'react-use-typewriter'
import { useDispatch } from 'react-redux'

import {
  Centered,
  NameContainer,
  Name,
  TyperContainer,
  HeaderContainer,
  Header,
  MenuItem,
  Icons
} from './styles'

const HeaderComponent: FunctionComponent = () => {

  const typerWords = ["Hacking Corona", "Add your profile to share with others"]
  const currentTyperWord = useTypewriter({
    words: typerWords,
    eraseSpeed: 50,
    typeSpeed: 120,
  })

  const dispatch = useDispatch()

  const dispatchStartAddProfile = useCallback(
    () => (dispatch({ type: "ASK_PROFILE", payload: true })),
    [dispatch]
  );

  return (<>
    <NameContainer>
      <Centered>
        <Name>
          Hacking Corona
        </Name>
        <TyperContainer>
          <div>{currentTyperWord}<span className="cursor">|</span></div>
        </TyperContainer>
      </Centered>
    </NameContainer>
    <HeaderContainer>
      <Header>
        <MenuItem onClick={dispatchStartAddProfile}>
          <FontAwesomeIcon icon="plus" size="2x" />&nbsp;&nbsp;Add Profile
        </MenuItem>
        <Icons>
          <a href="https://www.linkedin.com/in/peterbartels/"><FontAwesomeIcon icon={["fab", "linkedin"]} style={{ color: "#FFFFFF" }} size="2x" /></a>
          <a href="https://github.com/peterbartels/"><FontAwesomeIcon icon={["fab", "github"]} style={{ color: "#FFFFFF" }} size="2x" /></a>
        </Icons>
      </Header>
    </HeaderContainer>
  </>)
}

export default HeaderComponent
