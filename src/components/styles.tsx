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
  background: #21252A;
`

export const Name = styled.div`
  color: #FFFFFF;
  font-family: 'Nunito';
  font-size: 2rem;;
  padding: 30px 0px 30px 15px;  
`

export const TyperContainer = styled.div`
  color: #fff;
  display:flex;
  flex:1;
  justify-content: flex-end;
  div {
    width: 400px;
    padding: 5px;
    font-family: 'Sen';
    font-weight: bold;
  }
`

export const MenuItem = styled.div`
  color: white;
  font-family: 'Sen';
  color: white;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  cursor:pointer;
  &:hover {
    opacity: 0.7;
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
  height: 150px;
  padding: 50px;
  font-family: 'Sen';
`

export const ScannerContainer = styled.div`
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
`
