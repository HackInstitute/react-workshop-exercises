import React, { Component } from 'react';

import autoBind from 'react-autobind';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const story = storiesOf('react', module);

story.add('Hello world', () => {
  return (
    <span>Hello world</span>
  );
});

story.add('Render variables', () => {
  const name = 'Max';
  return (
    <span>Hello {name}!</span>
  );
});

story.add('Event handler', () => {
  return (
    <button onClick={action('Button pressed')}>Button</button>
  );
});

story.add('First custom component', () => {
  const MyButton = () => (
    <button onClick={action('Button pressed')}>MyButton</button>
  )

  return (
    <MyButton />
  );
});

story.add('Component with props', () => {
  const MyButton = (props) => (
    <button onClick={props.onClick}>{ props.label }</button>
  )

  return (
    <MyButton label="Button" onClick={action('Button pressed')} />
  );
});

story.add('Component delegate all props', () => {
  const MyButton = (props) => (
    <button {...props}>{ props.label }</button>
  )

  return (
    <MyButton label="Button" onClick={action('Button pressed')} />
  );
});

story.add('Component with children prop', () => {
  const MyButton = (props) => (
    <button {...props}>{ props.children }</button>
  )

  return (
    <MyButton onClick={action('Button pressed')}>Button</MyButton>
  );
});

story.add('Component with state', () => {
  class Counter extends Component {
    state = {
      value: 0,
    };

    render() {
      return (
        <div>
          <h1>current counter: { this.state.value }</h1>
          <button onClick={() => this.setState({ value: this.state.value - 1 })}>-</button>
          <button onClick={() => this.setState({ value: this.state.value + 1 })}>+</button>
        </div>
      );
    }
  }

  return <Counter />
});

story.add('Component with state (common format)', () => {
  class Counter extends Component {
    state = {
      value: 0,
    };

    render() {
      const { value } = this.state;

      return (
        <div>
          <h1>current counter: { value }</h1>
          <button onClick={() => this.setState({ value: value - 1 })}>-</button>
          <button onClick={() => this.setState({ value: value + 1 })}>+</button>
        </div>
      );
    }
  }

  return <Counter />
});

story.add('Component with auto bind', () => {
  class Counter extends Component {
    constructor(props) {
      super(props);
      // this.decrement = this.decrement.bind(this);
      // this.increment = this.increment.bind(this);
      autoBind(this);
    }

    state = {
      value: 0,
    };

    decrement() {
      this.setState(({ value }) => ({ value: value - 1 }));
    }

    increment() {
      this.setState(({ value }) => ({ value: value + 1 }));
    }

    render() {
      const { value } = this.state;

      return (
        <div>
          <h1>current counter: { value }</h1>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.increment}>+</button>
        </div>
      );
    }
  }

  return <Counter />
});
