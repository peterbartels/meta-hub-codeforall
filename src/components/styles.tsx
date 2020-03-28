import styled from 'styled-components'

const columnFlexCss = `
  display: flex;
  flex-direction: column;
  align-items: center;  
`

export const HeaderContainer = styled.div`
  ${columnFlexCss}
  width: 100%;
  padding: 0px 10px 0px 10px;
  background: #21252A;
`

export const NameContainer = styled.div`
  ${columnFlexCss}
  background: #414756;
`

export const Name = styled.div`
  color: #FFFFFF;
  font-family: 'Nunito';
  font-size: 2rem;;
  padding: 30px 0px 30px 15px;  
`

export const MenuContainer = styled.div`
  color: #fff;
  display:flex;
  flex:1;
  justify-content: flex-end;
  margin-top:10px;
  div {
  font-family: 'Sen';
  font-weight: bold;
  }
`

export const MenuItem = styled.div`
  color: white;
  font-family: 'Sen';
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor:pointer;
  border:solid 1px white;
  padding: 10px;
  margin:5px;
  &:hover {
  opacity: 0.7;
  }
  flex-direction:column;
  span {
  margin-top: 5px;
  }
`

export const Icons = styled.div`
  flex: 1;
  text-align: right;
  color: white;
`

export const Centered = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  align-items: center;
`

export const Header = styled(Centered)`
  background: #606fc8;
  padding:15px 15px 15px 15px;
  border-radius: 5px 5px 0px 0px;
  a {
    padding:15px 15px 15px 15px;
  }
`


export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`

export const ContentContainer = styled(MainContainer)`
  flex: 1;
  padding: 0px 10px 0px 10px;
`

export const Content = styled(Centered)`
  background: #ffffff;
  padding: 30px;
  color: black;
  display: block;
`

export const FooterContainer = styled(MainContainer)`

`

export const Footer = styled(Centered)`
  background: #414756;
  color:white;
  height: 40px;
  padding: 40px;
  font-family: 'Sen';
`

export const EditProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PrimaryButton = styled.button`
  background: #606fc8;
  color:white;
  border: solid 1px white;  
`

export const NumberInput = styled.input.attrs({
  type: 'number',
  min: 0,
  max: 100,
})`
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
`

//TODO: configure gutter instead of padding
export const SmallHeader = styled.div`
  padding: 0.2rem;
  font-family: 'Nunito';
  font-size: 2rem;
`
