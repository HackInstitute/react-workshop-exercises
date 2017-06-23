import React, { Component } from 'react'
import {action, storiesOf} from '@storybook/react'

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


// const element = <div className="example">Almost like a DOM element</div>

// const element = (
//   React.createElement("div", { className: "example" },
//     React.createElement("h1", null, "Example elements"),
//     React.createElement("ul", null,
//       React.createElement("li", null, "One item"),
//       React.createElement("li", null, "Another item")
//     )
//   )
// );

{/*<MyComponents.DatePicker color="blue" />*/}
// React.createElement(arguments)
// <...>marked it up</...>



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


stories.add('jsx dyn comp type', _ => {
  const ComponentTypes = {
    heading: 'h1'
  }
  return <ComponentTypes.heading>Content</ComponentTypes.heading> // wrong, doesnt work
  // const RootComponent = ComponentTypes['heading']
  // return <RootComponent>Content</RootComponent>
})

stories.add('jsx dyn el type', _ => {
  const rootTag = 'button',
        RootTag = rootTag
  // return <rootTag>Content</rootTag> // doesnt work(renders 'div')
  return <RootTag>Content</RootTag> // works!
})

stories.add('jsx spread', _ => {
  const attrs = {title: 'Click this to submit', value: 'Submit', type: 'button'};
  return <input {...attrs} />
})

stories.add('css', _ => {
  const attrs = {title: 'Click this to submit', value: 'Submit', type: 'button'};
  return <div>
    <style>{'.red { color: red }'}</style>
    <button className="red">redomato</button>
  </div>
})

stories.add('Storybook event example', _ => {
  const handleClick = event => {
    // debugger
    // alert('Click handled!')
    console.log(event.target)
  }
  return <button onClick={handleClick}>Click me</button>
})

// Less boilerplate:

stories.add('Storybook event action example', _ => {
  return <button onClick={action('Click logged')}>Click me</button>
})



// const fo = true

// <input value="&lt;3" />  === <input value={'<3'} />

// <button disabled /> === <button disabled={true} />

// const attrs = {title: 'Click this to submit', value: 'Submit'};
// return <button {...attrs} />