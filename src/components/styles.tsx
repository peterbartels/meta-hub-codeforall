import styled from 'styled-components'

const columnFlexCss = `
  display: flex;
  flex-direction: row;
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
`

export const Name = styled.div`
  color: #A9A9A9;
  margin-left:200px;
  font-family: 'Nunito';
  font-size: 2rem;;
  padding: 30px 0px 30px 15px;  
  ${columnFlexCss} 
  span {
  padding: 20px;
  }
`

export const MenuContainer = styled.div`
  display:flex;
  
  flex:1;
  margin-top:10px;
  margin-left:30px;
  div {
  font-family: 'Sen';
  font-weight: bold;
  }
`

export const MenuItem = styled.div`
  color: #A9A9A9;
  font-family: 'Sen';
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor:pointer;
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
  background: #0289C8;
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
  -webkit-box-shadow: 1px -7px 17px -11px rgba(0,0,0,0.58);
  -moz-box-shadow: 1px -7px 17px -11px rgba(0,0,0,0.58);
  box-shadow: 1px -7px 17px -11px rgba(0,0,0,0.58);
`

export const Content = styled(Centered)`
  background: #ffffff;
  padding: 30px;
  color: black;
  display: block;
  box-shadow:0px 9px 7px -5px #000000;
`

export const FooterContainer = styled(MainContainer)`
  background: #414756;
  margin-top: 1em;
`

export const Footer = styled(Centered)`
  color:white;
  padding: 40px;
  font-family: 'Sen';
  box-shadow:0px 9px 7px -5px #fff;
  display: flex;
  @media(min-width: 768px) {
    flex-direction: row;
    span {
      padding: 0 3em 0 3em;
      border-right: 2px solid #fff;
      &:last-child {
        border-right: 0px;
      }
    }
  }
  @media(max-width: 768px){
    flex-direction: column;
    span {
      width: 100%;
      padding: 1em;
      border-bottom: 2px solid #fff;
      &:last-child {
        border-bottom: 0px;
      }
    }
  }
`

export const EditProfileContainer = styled.div`                                                       
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PrimaryButton = styled.button`
  background: #0289C8;
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
