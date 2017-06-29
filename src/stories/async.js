import React, {Component} from 'react'

/**
 * Storybook setup
 */
import {storiesOf} from '@storybook/react'
const stories = storiesOf('Async JS', module)

stories.add('Promises', _ => {
  return <div>Check console output</div>
})

stories.add('async', _ => {
  const fetchData = async () => {
    return fetch('https://randomuser.me/api/')
  }

  const printData = async () => {
    try {
      const data = await fetchData()
      const json = await data.json()
      console.log(json)
    } catch(e) {
      console.error("Problem", e)
    }
  }

  printData()
  
  return <div>Check console output</div>
})