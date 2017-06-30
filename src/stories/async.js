import React, {Component} from 'react'

/**
 * Storybook setup
 */
import {storiesOf} from '@storybook/react'
const stories = storiesOf('Async JS', module)

stories.add('Promises', _ => {
  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(console.log)
    .catch(console.error)
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
      // console.log('###', await (await fetchData()).json())
    } catch(e) {
      console.error("Problem", e)
    }
  }

  printData()
  
  return <div>Check console output</div>
})

stories.add('async in react component', _ => {
  class Comp extends Component {
    state = { user: 'n/a' }

    fetchData () {
      return fetch('https://randomuser.me/api/')
    }
    
    async componentDidMount() {
      try {
        const response = await this.fetchData(),
              {info, results: [user, ...rest]} = await response.json()
        // NOTE: there will be a warning about unmounted component & setState
        // @see https://medium.com/front-end-hacking/async-await-with-react-lifecycle-methods-802e7760d802
        this.setState({user})
      } catch(err) {
        console.error(err)
      }
    }

    render () {
      const {user} = this.state
      return <div>
        A user: 
        <pre>{JSON.stringify(user)}</pre>
      </div>
    }
  }
  return <Comp />
})