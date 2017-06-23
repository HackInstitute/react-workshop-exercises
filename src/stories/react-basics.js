import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('react-basics', module)

const EventType = {
  FOO_ACTION: 'FOO_ACTION'
}

class SomeComponent extends React.Component {
  constructor () {
    super()
    this.setName = this.setName.bind(this)
    this.state = {nameFromState: null}
  }

  componentDidMount () {
    window.addEventListener(EventType.FOO_ACTION, this.setName)
  }

  componentWillUnmount () {
    window.removeEventListener(EventType.FOO_ACTION, this.setName)
  }

  setName () {
    this.setState({nameFromState: (new Date()).toLocaleTimeString()})
  }

  render () {
    const {name, onClick} = this.props
    const {nameFromState} = this.state
    return <div onClick={onClick}>
      Heyho {name} - {nameFromState}
    </div>
  }
}

stories.add('dev tools demo', () => {
  let name = 'world'
  const handleClick = e => {
    window.dispatchEvent(new window.Event(EventType.FOO_ACTION))
    name = 'FOOGO'
  }
  return <SomeComponent onClick={handleClick} name={name} />
})

stories.add('createEl', _ => {
  const name = 'world'
  return React.createElement('div', {name}, `Heyho ${name}`)
})
