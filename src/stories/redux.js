import React, {Component} from 'react'
import {createStore, bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'

/**
 * Storybook setup
 */
import {storiesOf} from '@storybook/react'
const stories = storiesOf('Redux - Basics', module)

/**
 * Solo redux - only use plain JS/DOM & redux to update a counter
 */
stories.addWithJSX('Solo redux', _ => {
  const {getState, dispatch, subscribe} = createStore(
    (state, action) => state + 1, // Reducer
    0,
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  const render = _ => {
    document.querySelector('#counter').innerText = getState()
  }

  subscribe(render)

  return <div>
    <button id='btn' onClick={_ => dispatch({type: 'ANY_TYPE_REALLY'})}>+</button>
    <div id='counter' />
  </div>
})

/**
 * React-redux
 */
import store, {ticketActionCreators} from '../store/staticTicketStore'
// stories.addDecorator(storyFn => <Provider store={store}>{storyFn()}</Provider>)

stories.addWithJSX('React redux - Ticket list', _ => {
  // App
  let App = ({addTicket, deleteTicket, tickets}) => {
    return <div>
      <TicketEntry onAddTicket={addTicket} />
      <hr />
      <TicketList tickets={tickets} onDeleteTicket={deleteTicket} />
    </div>
  }
  App = connect(
    state => ({tickets: state.tickets}),
    dispatch => bindActionCreators(ticketActionCreators, dispatch)
  )(App)

  // Components
  let TicketList = ({tickets, onDeleteTicket}) => <table>
    <tbody>
      {Object.keys(tickets).map(id => (
        <tr key={id}>
          <td>#{id}</td>
          <td>{tickets[id].title}</td>
          <td><button onClick={_ => onDeleteTicket(id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>

  class TicketEntry extends Component {
    constructor (props) {
      super(props)
      this.state = {title: ''}
      this.handleChange = this.handleChange.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange (e) {
      this.setState({ title: e.target.value })
    }

    handleKeyPress (e) {
      if (e.key !== 'Enter') return
      const {onAddTicket} = this.props
      const {title} = this.state
      onAddTicket(title)
      this.setState({ title: '' })
    }

    render () {
      const {title} = this.state
      return <p>
        <label>New ticket: </label>
        <input type='text'
          value={title}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress} />
      </p>
    }
  }

  return <Provider store={store}><App /></Provider>
}, {skip: 1})

/**
 * React-redux - async & remote
 */
import {TicketEntry, TicketList} from '../components'
import * as remoteStore from '../store/remoteTicketStore'

stories.addWithJSX('React redux - Async/Remote Ticket list', _ => {
  const {default: store, ticketActionCreators} = remoteStore

  // App
  let App = ({addTicket, deleteTicket, fetchTickets, tickets}) => {
    return <div>
      <TicketEntry onAddTicket={addTicket} />
      <hr />
      <p onClick={fetchTickets}>
        <button>Reload</button>
      </p>
      <TicketList tickets={tickets} onDeleteTicket={deleteTicket} />
    </div>
  }
  App = connect(
    state => ({tickets: state.tickets}),
    dispatch => bindActionCreators(ticketActionCreators, dispatch)
  )(App)

  // Kick off
  store.dispatch(ticketActionCreators.fetchTickets())
  
  return <Provider store={store}><App /></Provider>
}, {skip: 1})
