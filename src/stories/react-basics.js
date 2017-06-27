import React, { Component } from 'react'
import {action, setAddon, storiesOf} from '@storybook/react'

// Storybook enhancements
import JSXAddon from 'storybook-addon-jsx'
setAddon(JSXAddon)

const stories = storiesOf('react-basics', module)
const debugContainerStyle = {backgroundColor: '#f3f3f3', padding: '10px', maxWidth: '313px' }
stories.addDecorator(storyFn => <div style={debugContainerStyle}>{storyFn()}</div>)

/* Nesting & composition ******************************************************************/

/**
 * Button component
 */
const buttonStyle = {
  backgroundColor: '#0275d8',
  borderRadius: 3,
  border: 'none',
  color: '#fff',
  display: 'inline-block',
  fontSize: '14px',
  padding: '10px',
  marginRight: '2px'
}
const Button = ({label}) => <button style={buttonStyle}>{label}</button>

stories.addWithJSX('Button', _ => {
  return <Button label="Submit" />
})


/**
 * Panel component
 */
const style = {
  root: {
    backgroundColor: '#fff',
    borderRadius: 3,
    border: '1px solid silver',
    fontSize: '14px',
    fontFamily: 'sans-serif',
    color: '#555',
  },
  content: {
    padding: '0 10px 20px 10px'
  }
}

const Panel = ({actions, children, img, title}) => (
  <div style={style.root}>
    {img && <img src={img} />}
    <div style={style.content}>
      <h1>{title}</h1>
      {children}
      {actions && actions.map(({label}) => <Button key={label} label={label} />)}
    </div>
  </div>
)

stories.addWithJSX('Panel w/ child button', _ => {
  return (
    <Panel title="Card title" img="http://via.placeholder.com/311x180">
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <Button label="Submit" />
    </Panel>
  )
})

stories.addWithJSX('Panel w/ action buttons', _ => {
  const actions = [
    {label: 'Cancel'},
    {label: 'Save'},
  ]
  return (
    <Panel actions={actions} title="Card title" img="http://via.placeholder.com/311x180">
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </Panel>  
  )
})
