import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Moon } from '../assets/icons/moon.svg'
import { ReactComponent as Sun } from '../assets/icons/sun.svg'
import { ReactComponent as NCWhite } from '../assets/icons/NCWhite.svg'
import { ReactComponent as NCBlack } from '../assets/icons/NCBlack.svg'

export const Header = styled.header`
  background-color: ${props => props.theme.colors.background};
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`

export const Main = styled.section`
  align-items: center;
  background-color: ${props => props.theme.colors.body};
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
`

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  color: #61dafb;
  margin-top: 10px;
`

export const PrimaryButton = styled.button`
  background: ${props => props.theme.buttons.primary.background};
  border: ${props => props.theme.buttons.primary.border};
  border-radius: 8px;
  color: ${props => props.theme.buttons.primary.text.main};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 20px;
  padding: 12px 24px;

  ${props => props.hidden && 'hidden'} :focus {
    border: none;
    outline: none;
  }
`

export const SecondaryButton = styled(PrimaryButton)`
  background: ${props => props.theme.buttons.secondary.background};
  border: ${props => props.theme.buttons.secondary.border};
  color: ${props => props.theme.buttons.secondary.text.main};
`

export const NoBorderButton = styled(SecondaryButton)`
  border: none;
`

const NCLogoContainer = styled.div`
  position: absolute;
  left:1em;
`


export const NCLogo = (props) => {
  const NCIcon = props.theme.name === 'light' ? NCWhite : NCBlack
  return (
    <NCLogoContainer>
      <NCIcon/>
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
