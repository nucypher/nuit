import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { ReactComponent as Moon } from '../assets/icons/moon.svg'
import { ReactComponent as Sun } from '../assets/icons/sun.svg'
import { ReactComponent as NCWhite } from '../assets/icons/NCWhite.svg'
import { ReactComponent as NCBlack } from '../assets/icons/NCBlack.svg'

export { WorkerETHAddressField } from './ethAddressField'
export { NuStakeAllocator } from './nuStakeAllocator'
export { Slider } from './slider'


const spaces = {
  xs: "4px",
  s: "8px",
  m: "12px",
  l: "16px",
  xl: "24px",
  xxl: "32px",
  xxxl: "48px"
}


const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

export const HeaderNav = styled.header`
  background-color: ${props => props.theme.colors.background};
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.theme.colors.text.standard};
`

export const Main = styled.div`
  background-color: ${props => props.theme.colors.body};
  color: ${props => props.theme.colors.text.standard};

  & .bg-color {
    background-color: ${props => props.theme.colors.extrabg};
  }


  // override bootstrap colors with theme colors
  & .card {
    background-color: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.text.grey75};
  }
  & .card>.card-body {
    background-color: ${props => props.theme.colors.background};
    border-radius: ${spaces.xl};

  }
`

export const ButtonBox = styled.div`
  padding:10px;
  background-color: ${props => props.theme.colors.extrabg};
  border-radius: ${spaces.xl};
`
export const Blue = styled.span`
  color: ${props => props.theme.colors.blue};
`

export const Purple = styled.span`
color: ${props => props.theme.colors.purple};
`

export const Grey = styled.span`
color: ${props => props.theme.colors.text.grey75};
`

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: ${spaces.s};
  pointer-events: none;
`

export const HR = styled.hr`
  border-top: 2px solid ${props =>  props.theme.colors[props.color||'#828A9C']};
`

export const NCButtonBase = styled.button`
  background: ${props => props.theme.buttons.primary.background};
  border: ${props => props.theme.buttons.primary.border};
  border-radius: ${spaces.l};
  color: ${props => props.theme.buttons.primary.text.main};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  padding: ${spaces.m} ${spaces.xl};
  justify-content: center;
  align-items: center;

  border-radius: ${spaces.l};
  margin: ${spaces.xs} ${spaces.s};
  padding: ${spaces.m} ${spaces.xl};
  justify-content: center;
  align-items: center;


  @media ${device.tablet} {
    margin: ${spaces.s} ${spaces.l};
    min-width: 12em;
  }


  ${props => props.hidden && 'hidden'} :focus {
    border: none;
    outline: none;
  }
`

export const PrimaryButton = styled(NCButtonBase)`
  background: ${props => props.theme.buttons.primary.background};
  border: ${props => props.theme.buttons.primary.border};
  color: ${props => props.theme.buttons.primary.text.main};
`


export const PurpleButton = styled(PrimaryButton)`
  background: ${props => props.theme.colors.purple};
  color: white;
`

export const SecondaryButton = styled(PrimaryButton)`
  background: ${props => props.theme.buttons.secondary.background};
  border: ${props => props.theme.buttons.secondary.border};
  color: ${props => props.theme.buttons.secondary.text.main};
`

export const NoBorderButton = styled(SecondaryButton)`
  border: 2px solid transparent;
  a.active & {
    transition: margin 1s;
    margin-bottom: ${spaces.s};
    background-color: ${props => props.theme.colors.body};
    border: ${props => props.theme.buttons.secondary.border};
    box-shadow: ${props => props.theme.colors.shadow};
  }
`
const NCLogoContainer = styled.div`
  position: absolute;
  left:1em;
  font-size:2em;
  font-weight:600
`

export const InputBox = styled.div`
  margin-top: ${spaces.l};
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  padding: ${spaces.xxl};
  border-radius: ${spaces.xl};
  min-width: 32em;
  box-shadow: ${props => props.theme.colors.shadow};

  & input{
    background-color: ${props => props.theme.colors.extrabg};
  }

  & .form-control{
    display:inline-block;
    width:90%;
  }
  & .form-control.valid{
    margin-right:${spaces.s};
  }
`

export const Input = styled.input`
   font-family: 'Open Sans', sans-serif;
   background-color: ${props => props.theme.colors.extrabg};
   padding: ${spaces.l} 0;
   line-height: normal;
   width: 100%;
   margin: ${spaces.s}; auto ${spaces.xl}; auto;
   padding-left: ${spaces.xl};
   font-size: ${spaces.xl};
   font-weight: 600;
   border: 1px solid
      ${props => (props.isInvalid ? 'tomato' : props.theme.colors.extrabg )};
   &:hover {
      transition: 0.3s;
      border: 1px solid ${ props => (props.isInvalid ? 'tomato' : props.theme.colors.blue)};
   }
   &:focus {
      border: 1px solid ${ props => (props.isInvalid ? 'green' : props.theme.colors.blue)};
      background-color: ${props => props.theme.colors.extrabg};
   }
   &::placeholder {
      letter-spacing: 0.5px;
      /* padding: 15px 0; */
      font-weight: 700;
      opacity: 1;
   }
   &:focus::placeholder {
      opacity: 0;
   }
`;

export const SliderInput = styled.div`
   input {
      -webkit-appearance: none; /* Override default CSS styles */
      appearance: none;
      width: 90%;
      display: block;
      margin: ${spaces.s}; auto ${spaces.xl}; auto;
      padding-left: ${spaces.xl};
      background: ${props => props.theme.colors.extrabg};
      height:${spaces.s};
      outline: none;
      opacity: 0.7;
      border-radius: 10px;
      &:focus {
         outline: none;
      }
      &:hover {
         cursor: pointer;
      }
      &::-moz-range-thumb {
         width: 17px;
         height: 17px;
         background: #888;
         opacity: 1;
         cursor: pointer;
         border-radius: 5px;
      }
      &:focus::-moz-range-thumb {
         opacity: 0.99;
      }
   }
   div {
      margin-top: 10px;
      width:90%;
      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;
      span {
         color: grey;
         padding: 0 6px 0 10px;
         font-size: 12px;
      }
   }
`;



export class ButtonGroup extends React.Component{

  /*
    A group of buttons with one 'active' button.
    Like radio buttons.
    <ButtonGroup onCLick="<a react setState operator>">
      <Button>...</Button>
      <Button>...</Button>
      <Button>...</Button>
    </ButtonGroup>
  */

  constructor(props) {
    super(props)

    this.state = {
      selected: props.initial || 0
    };

    this.children = this.props.children

    this.onClick = this.onClick.bind(this);
    this.setActive = this.setActive.bind(this);
    this.setActive(this.state.selected)

  }

  handleChange(value){
    this.setState({selected: value})
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  configureChild(child, classname, index) {
    const data = {'data-index': index}
    return React.cloneElement(child, {
      onClick: this.onClick,
      key: index,
      className: `${child.props.className ? child.props.className : ''} ${classname}`,
      ...child.props, ...data
    })
  }

  setActive(value) {
    this.children = this.props.children.map((child, index) => {
      return this.configureChild(child, index === value ? 'active': '', index)
    })
  }

  onClick(event) {
    const value = parseInt(event.currentTarget.getAttribute('data-index') || 0)
    this.setActive(value)
    this.handleChange(value)
  }

  render() {
    return (
      <ButtonBox {...this.props}>{this.children}</ButtonBox>
    )
  }
}


export const NCLogo = (props) => {
  const NCIcon = props.theme.name === 'light' ? NCWhite : NCBlack
  return (
    <NCLogoContainer>
      <Link to="/"><Blue>Nu</Blue>Cypher</Link>
    </NCLogoContainer>
  )
}

export class ThemeButton extends React.Component {

  constructor (props) {
    super(props)
    this.setTheme = this.setTheme.bind(this);
  }

  setTheme() {
    window.localStorage.setItem('theme', this.props.theme.current.name === 'light' ? 'dark' : 'light');
    this.props.theme.setTheme(
      this.props.theme.current.name === 'light' ? this.props.theme.dark : this.props.theme.light
    )
  }

  render () {
    const icon = this.props.theme.current === this.props.theme.dark ? <Sun /> : <Moon />
    return <NoBorderButton onClick={this.setTheme}>
      {icon}
    </NoBorderButton>
  }
}