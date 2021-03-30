import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'


import { ReactComponent as Moon } from '../assets/icons/moon.svg'
import { ReactComponent as Sun } from '../assets/icons/sun.svg'
import { ReactComponent as NCWhite } from '../assets/icons/NCWhite.svg'
import { ReactComponent as NCBlack } from '../assets/icons/NCBlack.svg'

export const HeaderNav = styled.header`
  background-color: ${props => props.theme.colors.background};
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.theme.colors.text.standard};
`

export const Main = styled.section`
  background-color: ${props => props.theme.colors.body};
  color: ${props => props.theme.colors.text.standard};
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
  margin-bottom: 16px;
  pointer-events: none;
`

export const HR = styled.hr`
  border-top: 2px solid ${props =>  props.theme.colors[props.color||'grey75']};
`

export const PrimaryButton = styled.button`
  background: ${props => props.theme.buttons.primary.background};
  border: ${props => props.theme.buttons.primary.border};
  border-radius: .3em;
  color: ${props => props.theme.buttons.primary.text.main};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 1em;
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 12em;

  ${props => props.hidden && 'hidden'} :focus {
    border: none;
    outline: none;
  }
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
  border: none;
`

const NCLogoContainer = styled.div`
  position: absolute;
  left:1em;
  font-size:2em;
  font-weight:600
`


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
