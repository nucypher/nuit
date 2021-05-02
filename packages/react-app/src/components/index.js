import React from 'react'
import styled from 'styled-components'

import {Link} from 'react-router-dom'
import {ReactComponent as Moon} from '../assets/icons/moon.svg'
import {ReactComponent as Sun} from '../assets/icons/sun.svg'

export { WorkerETHAddressField, WorkerRunwayDisplay, EthBalance } from '@project/react-app/src/components/ethComponents'
export { NuStakeAllocator, NuBalance } from '@project/react-app/src/components/nuComponents'
export { Slider } from '@project/react-app/src/components/slider'
export { CircleQ } from '@project/react-app/src/components/circleQ'

export { BondWorker } from '@project/react-app/src/components/actions/bondWorker'
export { Migrate } from '@project/react-app/src/components/actions/migrate'
export { CreateStake } from '@project/react-app/src/components/actions/createStake'

export { SubStakeList } from '@project/react-app/src/components/substake'


const spaces = {
  xs: "4px",
  sm: "6px",
  md: "12px",
  lg: "16px",
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

  & .nowrap {
    white-space: nowrap!important;
  }
`

export const ButtonBox = styled.div`
  padding:10px;
  background-color: ${props => props.theme.colors.extrabg};
  border-radius: ${spaces.sm};

  .modal-body &, .modal-body & input {
    background-color: white;
  }
`


export const Purple = styled.span`
color: ${props => props.theme.colors.purple};
`

export const Grey = styled.span`
color: ${props => props.theme.colors.text.grey75};
`

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: ${spaces.sm};
  pointer-events: none;
`

export const HR = styled.hr`
  border-top: 2px solid ${props =>  props.theme.colors[props.color||'#828A9C']};
`

export const NCButtonBase = styled.button`
  background: ${props => props.theme.buttons.primary.background};
  border: ${props => props.theme.buttons.primary.border};
  border-radius: ${spaces.sm};
  color: ${props => props.theme.buttons.primary.text.main};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  position:relative;

  justify-content: center;
  align-items: center;

  white-space: nowrap;

  @media ${device.tablet} {
    min-width: ${ props => (props.width ? `${props.width}` : '9em')};
  }


  ${props => props.hidden && 'hidden'} :focus {
    border: none;
    outline: none;
  }

  width: ${ props => (props.width ? `${props.width}` : 'inherit')};
  padding: ${ props => ((props.small || props.tiny) ? `${props.tiny ? '1px' : spaces.xs} ${props.tiny ? '1px' : spaces.sm}` : `${spaces.md} ${spaces.xl}`)};

`

export const PrimaryButton = styled(NCButtonBase).attrs({ className: 'bluebg' })`
  background: ${props => (props.disabled ? props.theme.colors.text.grey75: props.theme.buttons.primary.background)};
  border: ${props => props.theme.buttons.primary.border};
  color: ${props => (props.disabled ? 'white' : props.theme.buttons.primary.text.main)};
`

export const Blue = styled('span')`
  color: ${props => props.theme.colors.blue};

  .bluebg & {
    color: white;
  }
`

export const Error = styled('span')`
  color: ${props => props.theme.colors.red} !important;
  font-weight: 600;
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
    margin-bottom: ${spaces.sm};
    background-color: ${props => props.theme.colors.body};
    border: ${props => props.theme.buttons.secondary.border};
    box-shadow: ${props => props.theme.colors.shadow};
  }
`

export const ToggleButton = ({activeCheck, boolState, onClick, abort}) => {

  const handleAbort = () => {
      // puts the button back in cases where someone cancelled a transaction or something like that
      if (abort) {
          abort(false)
      }
  }

  return (
      <div className="d-flex justify-content-center">{ activeCheck ? <Spinner onClick={handleAbort}/> :
      <div>{
          boolState ?
          <PrimaryButton onClick={onClick} className="mt-2">On</PrimaryButton> :
          <SecondaryButton onClick={onClick} className="mt-2">Off</SecondaryButton>
      }</div>}</div>
  )
}

export const PendingButton = (props) => {

  const handleAbort = () => {
      // puts the button back in cases where someone cancelled a transaction or something like that
      if (props.abort) {
          props.abort(false)
      }
  }

  return (
      <div className="d-flex justify-content-center">{ props.activeCheck ?
          <Spinner onClick={handleAbort}/> :
          <PrimaryButton {...props}>{props.children}</PrimaryButton>
      }</div>
  )
}


const NCLogoContainer = styled.div`
  position: absolute;
  left:1em;
  font-size:2em;
  font-weight:600
`

export const InputBox = styled.div`
  margin-top: ${spaces.lg};
  background-color: ${props => props.theme.colors.background};
  padding: ${spaces.xxl};
  border-radius: ${spaces.xl};
  box-shadow: ${props => props.theme.colors.shadow};
  margin:auto;

  & input{
    background-color: ${props => props.theme.colors.extrabg};
  }

  & .form-control{
    display:inline-block;
    width:90%;
  }

  & .modal-body, .modal-body & input {
    background-color: ${props => props.theme.colors.extrabg};
    border-radius: ${spaces.sm};
  }

`

export const Input = styled.input`
   font-family: "Helvetica Neue", "Open Sans", sans-serif;
   background-color: ${props => props.theme.colors.extrabg};
   padding: ${spaces.lg} 0;
   line-height: normal;
   width: 100%;
   margin: ${spaces.sm}; auto ${spaces.xl}; auto;
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
      margin: ${spaces.sm}; auto ${spaces.xl}; auto;
      padding-left: ${spaces.xl};
      background: ${props => props.theme.colors.extrabg};
      height:${spaces.sm};
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

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PopupMessages = styled.div`
  position:absolute;
  right:0px;
  top: 75px;
`

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


const SpinnerGraphic =styled.div`

  cursor:pointer;

  border-radius: 50%;
  width: 3em;
  height: 3em;

 &:after {
    border-radius: 50%;
    width: 3em;
    height: 3em;
  }

  display:inline-block;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`


export const Spinner = () => {
  return (
    <SpinnerGraphic className="mt-3"/>
  )
}
