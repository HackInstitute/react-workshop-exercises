import React, { Component } from 'react'
import {action, storiesOf} from '@storybook/react'

const stories = storiesOf('react-basics', module)


/**
 * Nesting & composition
 */
const debugContainerStyle = {backgroundColor: '#f3f3f3', padding: '10px', maxWidth: '313px' }

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

stories.add('Button', _ => {
  return <Button label="Submit" />
})

const panelStyle = {
  backgroundColor: '#fff',
  borderRadius: 3,
  border: '1px solid silver',
  fontSize: '14px',
  fontFamily: 'sans-serif',
  color: '#555',
}
const panelContentStyle = {
  padding: '0 10px 20px 10px'
}


const Panel = ({actions, children, img, title}) => <div style={panelStyle}>
  {img && <img src={img} />}
  <div style={panelContentStyle}>
    <h1>{title}</h1>
    {children}
    {actions && actions.map(({label}) => <Button label={label} />)}
  </div>
</div>

stories.add('Panel w/ child button', _ => {
  return <div style={debugContainerStyle}>
    <Panel title="Card title" img="http://via.placeholder.com/311x180">
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <Button label="Submit" />
    </Panel>  
  </div>
})

stories.add('Panel w/ action buttons', _ => {
  const actions = [
    {label: 'Cancel'},
    {label: 'Save'},
  ]
  return <div style={debugContainerStyle}>
    <Panel actions={actions} title="Card title" img="http://via.placeholder.com/311x180">
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </Panel>  
  </div>
})
