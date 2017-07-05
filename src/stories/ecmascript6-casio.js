import React, { Component } from 'react'
import {action, setAddon, storiesOf} from '@storybook/react'

// Storybook enhancements
import JSXAddon from 'storybook-addon-jsx'
setAddon(JSXAddon)

const stories = storiesOf('own ecma', module)

stories.add('for of', async _ => {
  const li = [
    {id: 1},
    {id: 2},
    {id: 3},
  ]
  // for(let o of li) {
  for(let o of (await Promise.all(li))) {
    console.log('###', o)
  }
  return <div>FOO</div>
})

stories.add('...', _ => {
  return <div>A</div>
})


stories.add('rnd xy', _ => {
  const fn = (a=0, b=10) => {
    a = Math.ceil(a)
    b = Math.floor(b)
    return Math.floor(Math.random() * (b - a + 1)) + a
  }
  console.log('###', fn())
  console.log('###', fn(5,10))
  console.log('### 5-7', fn(5,7))
  return <div>res</div>
})


stories.add('stringify getter/setter', _ => {
  const _nameSym = Symbol('name')
  const user = {
    get name () { return this[_nameSym] || 'n/a' },
    set name (name) {
      this[_nameSym] = name
    },
  }
  user.name = 'me'
  
  return <div>{JSON.stringify(user)}</div>
})
