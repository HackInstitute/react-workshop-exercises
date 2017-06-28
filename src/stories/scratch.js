import React, { Component } from 'react'
import {action, storiesOf} from '@storybook/react'

const stories = storiesOf('Scratch', module)

let Compomat = ({children}) => {
  console.log('### kids', children)
  return <div>{children}</div>
}

stories.add('children', _ => {
  return <Compomat>
    <div>A</div>
    <div>B</div>
  </Compomat>
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


stories.add('iteration - forEach', _=> {
  const persons = ['Peter', 'Paul', 'Mary']
  return <ul>
    {persons.forEach(person => <li>{person}</li>)}
  </ul>
})

stories.add('iteration - map', _=> {
  const persons = ['Peter', 'Paul', 'Mary']
  return <ul>
    {persons.map(person => <li>{person}</li>)}
  </ul>
})

stories.add('iteration - filter', _=> {
  const persons = ['Peter', 'Paul', 'Mary']
  return <ul>
    {persons.map(person => person.startsWith('M'))}
  </ul>
})

stories.add('fn comp prop', _ => {
  const MyCustomElement = ({label}) => <div className="custom">{label}</div>
  return <MyCustomElement label="spam eggz" />
})


stories.add('fn comp fn prop', _ => {
  const MyCustomElement = ({label}) => <div className="custom">{label}</div>
  const fun = _ => {
    return 'lorem'
  }
  return <MyCustomElement label={fun()} />
})

// <main>
//   <h1>The Post</h1>
//   <h2>The author</h2>
//   <p>The content</p>
// </main>

// <DashBoard>
//   <WordClockScreen
//     hours={time.hours} 
//     minutes={time.minutes} />
//   <Map pins={pins} zoomLevel={.4} />
// </DashBoard>


{/*<input value="&lt;3" />  === <input value={'<3'} />*/}

{/*// <button disabled /> === <button disabled={true} />*/}

{/*const attrs = {title: 'Click this to submit', value: 'Submit'};*/}
{/*return <button {...attrs} />*/}


// <MyCustomElement label="Awesome">

// function MyComponents(props) {
//   const name = props.name
//   return (
//     <div className="custom">{label}</div>
//   )
// }

// // Less boilerplate:

// const MyCustomElement = ({label}) => {
//   return <div className="custom">{label}</div>
// }



///////////////////////////////////////////////////////////

const EventType = {
  FOO_ACTION: 'FOO_ACTION'
}

class SomeComponent extends React.Component {
  constructor () {
    super()
    this.setName = this.setName.bind(this)
    this.state = {nameFromState: 'n/a'}
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



{/*<div> { if(true) { <div>some conditional text</div> } } </div>*/}
// { shouldShow && <div>conditional content</div> }

// { redPill ? <div>Neo</div> : <div>Cypher</div> }


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