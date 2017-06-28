import React, {Component} from 'react'

// Components
export const TicketList = ({tickets, onDeleteTicket}) => <table>
  <tbody>
    {tickets.map(({id, title}) => (
      <tr key={id}>
        <td>#{id}</td>
        <td>{title}</td>
        {/*<td><small>edit</small></td>*/}
        <td><button onClick={_ => onDeleteTicket(id)}>Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>

export class TicketEntry extends Component {
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