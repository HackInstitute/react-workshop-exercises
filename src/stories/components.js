import React, {Component} from 'react'

/**
 * Storybook setup
 */
import {storiesOf} from '@storybook/react'
const stories = storiesOf('Component tests', module)


class ToggleForm extends Component {
  static Mode = {
    READ: 'read',
    WRITE: 'write'
  }

  state = {
    mode: ToggleForm.Mode.READ,
    _data: {...this.props.data} // saving a private copy of given data
  }

  handleDisplayClick = _ => {
    this.setState({mode: ToggleForm.Mode.WRITE})
  }

  handleFormSubmit = (data) => {
    const {onChange} = this.props
    onChange && onChange(data)
    this.setState({mode: ToggleForm.Mode.READ, _data: {...data}})
  }

  renderDisplay = () => {
    const {_data: data} = this.state
    const {display: Display} = this.props
    if (Display) {
      return <Display data={data} onClick={this.handleDisplayClick} />
    } else {
      // Rendering a naive default display tmpl
      return <div onClick={this.handleDisplayClick}>
        {Object.keys(data).map(key => 
          <p key={key}>
            <strong>{key}</strong> {data[key]}
          </p>
        )}
      </div> 
    }
  }

  renderForm = () => {
    const {data, form: Form} = this.props
    return <Form data={data} onSubmit={this.handleFormSubmit} />
  }

  render () {
    const {mode} = this.state
    return <div>
      {mode === ToggleForm.Mode.READ ? 
        this.renderDisplay() :
        this.renderForm()}
      <small>MODE: {mode}</small>
    </div>
  }
}

class ContactForm extends Component {
  state = {...this.props.data} // again, saving initial data from props to private, local state

  handleChange = (e, attr) => {
    this.setState({[attr]: e.target.value})
  }

  render() {
    const {onSubmit} = this.props
    const {firstName, lastName} = this.state
    return <div>
      <p>
        <label>First name</label>
        <input type="text" autoFocus
          onChange={e => this.handleChange(e, 'firstName')}
          value={firstName} />
      </p>
      <p>
        <label>Last name</label>
        <input type="text" 
          onChange={e => this.handleChange(e, 'lastName')}
          value={lastName} />
      </p>
      <button onClick={_ => onSubmit(this.state)}>Save</button>
    </div>
  }
}

stories.add('ToggleForm - with default display', _ => {
  let user = {firstName: 'Georgia', lastName: 'Purorgia'}
  const handleChange = data => {
    console.log('### ToggleForm onChange callback', data)
  }
  return <div>
    <ToggleForm data={user} form={ContactForm} onChange={handleChange} />
  </div>
})


stories.add('ToggleForm - with specific display', _ => {
  let user = {firstName: 'Dan', lastName: 'Abramov'}
  
  const ContactDisplay = ({data: {firstName, lastName}, onClick}) => {
    return <dl onClick={onClick}>
      <dt><strong>First name</strong></dt>
      <dd>{firstName}</dd>
      <dt><strong>Last name</strong></dt>
      <dd>{lastName}</dd>
    </dl>
  }

  return <div>
    <ToggleForm data={user} form={ContactForm} display={ContactDisplay} />
  </div>
})
