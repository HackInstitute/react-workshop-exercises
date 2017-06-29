import React, { Component } from 'react'
import {action, storiesOf} from '@storybook/react'

const stories = storiesOf('Scratch', module)

stories.add('Checko', _ => {
  
})

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
  const attrs = {title: 'Click this to submit', value: 'Submit', type: 'button'}
  return <input {...attrs} />
})

stories.add('css', _ => {
  const attrs = {title: 'Click this to submit', value: 'Submit', type: 'button'}
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


{/*<input value="&lt3" />  === <input value={'<3'} />*/}

{/*// <button disabled /> === <button disabled={true} />*/}

{/*const attrs = {title: 'Click this to submit', value: 'Submit'}*/}
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
// )

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



// {
//   tickets: {
//     1: {...},
//     2: {...},
//     3: {...},
//   },
//   users: {
//     1: {...},
//     2: {...},
//     3: {...},
//   },
//   messages: {
//     1: {...},
//     2: {...},
//     3: {...},
//   }
// }


// const reducer = (state, action) => {
//   switch (action.type) {
//     case ADD_USER:
//       ...
//       return ...
//     case ADD_TICKET:
//       ...
//       return ...
//     case ADD_MESSAGE:
//       ...
//       return ...
//     default:
//       return state
//   }
// }


// const userReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ADD_USER: 
//       return ...
//     ...
//   }
// }

// const ticketReducer = (state = {1: {title: 'Fix the internet'}}, action) => {
//   switch (action.type) {
//     case ADD_TICKET: 
//       return ...
//     ...
//   }
// }

// const store = createStore(combineReducers({users: userReducer, tickets: ticketReducer}))
// store.getState() // {users: {}, tickets: {1: {title: 'Fix the internet'}



// import {createSelector} from 'reselect'

// const shopItemsSelector = state => state.shop.items
// const taxPercentSelector = state => state.shop.taxPercent

// const subtotalSelector = createSelector(
//   shopItemsSelector,
//   items => items.reduce((acc, item) => acc + item.value, 0)
// )

// const taxSelector = createSelector(
//   subtotalSelector,
//   taxPercentSelector,
//   (subtotal, taxPercent) => subtotal * (taxPercent / 100)
// )

// export const totalSelector = createSelector(
//   subtotalSelector,
//   taxSelector,
//   (subtotal, tax) => ({ total: subtotal + tax })
// )

// let exampleState = {
//   shop: {
//     taxPercent: 8,
//     items: [
//       { name: 'apple', value: 1.20 },
//       { name: 'orange', value: 0.95 },
//     ]
//   }
// }

// console.log(subtotalSelector(exampleState)) // 2.15
// console.log(taxSelector(exampleState))      // 0.172
// console.log(totalSelector(exampleState))    // { total: 2.322 }


// /actions
// /constants
// /reducers
// /middleware
// /containers
// /components
// app.js


// /estimates
// /tickets
//   /actions
//   /components
//   /reducers
//   /views
//   /...
// /users
// /common
// app.js

// /components
// /services
//   api.js
//   notification.js
// /views
// /ducks
//   estimates.js
//   users.js
//   tickets.js
//   store.js
// /components
// app.js


// // actions.js
// export function loadFoo(id) {
//   return {
//     type: LOAD_FOO,
//     promise: Api.getFoo(id),
//     meta: {
//       onSuccess: (response) => logSuccess(response)
//     }
//   }
// }

// // reducer.js
// import { handle } from 'redux-pack'

// export function fooReducer(state = initialState, action) {
//   const { type, payload } = action
//   switch (type) {
//     case LOAD_FOO:
//       return handle(state, action, {
//         start: prevState => ({
//           ...prevState,
//           isLoading: true,
//           fooError: null
//         }),
//         finish: prevState => ({ ...prevState, isLoading: false }),
//         failure: prevState => ({ ...prevState, fooError: payload }),
//         success: prevState => ({ ...prevState, foo: payload }),
//       })
//     default:
//       return state
//   }
// }