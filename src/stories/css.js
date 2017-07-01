import React, {Component} from 'react'
import {createStore, bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'

/**
 * Storybook setup
 */
import {storiesOf} from '@storybook/react'
const stories = storiesOf('CSS', module)

/**
 * style attr - simple
 */
stories.addWithJSX('style attr - simple', _ => {
  const baseStyle = {
          backgroundColor: 'silver',
          borderRadius: '3px',
          color: 'ghostWhite',
          padding: '5px',
          fontFamily: 'sans-serif',
        }
  return <div style={baseStyle}>The `style` attr</div>
})

/**
 * style attr - merge
 */
stories.addWithJSX('style attr - merge', _ => {
const baseStyle = {
        backgroundColor: 'silver',
        borderRadius: '3px',
        color: 'ghostWhite',
        padding: '5px',
        fontFamily: 'sans-serif',
      },
      importantStyle = {
        backgroundColor: 'tomato',
        padding: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }
return <div style={{...baseStyle, ...importantStyle}}>The `style` attr</div>
})

/**
 * className attr - inline
 */
stories.addWithJSX('className attr - inline', _ => {
  return <div>
    <style>{`
      .myBtn { border: 1px solid silver; }
      .myBtn--large { font-size: 40px; }
      .myBtn--warning { color: red; }
    `}</style>
    <div className="myBtn myBtn--large">The `className` attr</div>
  </div>
})

/**
 * className attr - var! only concat/interpol, though 
 */
stories.addWithJSX('className attr - var', _ => {
  const isLarge = true,
        isWarning = true,
        baseClass = 'myBtn'

  let btnClass = baseClass
  if(isLarge) btnClass += ' myBtn--large'
  if(isWarning) btnClass += ' myBtn--warning'

  return <div>
    <style>{`
      .myBtn { border: 1px solid silver; }
      .myBtn--large { font-size: 40px; }
      .myBtn--warning { color: tomato; }
    `}</style>
    <div className={btnClass}>The `className` attr</div>
  </div>
})


/**
 * className attr - var, but with `classnames`
 */
import cn from 'classnames'
stories.addWithJSX('className attr - var w/ classnames', _ => {
  const isLarge = false,
        isWarning = true
  const btnClass = cn('myBtn', {
    'myBtn--large': isLarge, 
    'myBtn--warning': isWarning
  })
  return <div>
    <style>{`
      .myBtn { border: 1px solid silver; }
      .myBtn--large { font-size: 40px; }
      .myBtn--warning { color: tomato; }
    `}</style>
    <div className={btnClass}>The `className` attr</div>
  </div>
})


/**
 * className attr - import js, err... css modules - thx webpack! :D
 */
import './styles.css'
stories.addWithJSX('importing actual css', _ => {
  const isLarge = true,
        isWarning = true
  const btnClass = cn('btn', {
    'btn--large': isLarge, 
    'btn--warning': isWarning
  })
  return <div className={btnClass}>The `className` attr</div>
})