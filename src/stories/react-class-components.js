import React, { Component } from 'react';
import PropTypes from 'prop-types';

import autoBind from 'react-autobind';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const story = storiesOf('react class components', module);

story.add('Hello world', () => {
  class HelloWorld extends Component {
    render() {
      return (
        <div>Hello world</div>
      );
    }
  }

  return <HelloWorld />;
});

story.add('Render props', () => {
  class HelloWorld extends Component {
    render() {
      return (
        <div>Hello {this.props.name || 'world'}!</div>
      );
    }
  }

  return <HelloWorld name="Max" />;
});

story.add('Render state from member var', () => {
  class Random extends Component {
    state = {
      randomValue: Math.random(),
    };

    render() {
      return (
        <div>Random: {this.state.randomValue}!</div>
      );
    }
  }

  return <Random />;
});

story.add('Render state from member var with props', () => {
  const getRandomNumber = (from = 0, to = 1) => {
    return from + Math.floor(Math.random() * (to - from));
  }

  class Random extends Component {
    state = {
      randomValue: getRandomNumber(this.props.from, this.props.to),
    };

    render() {
      return (
        <div>Random: {this.state.randomValue}!</div>
      );
    }
  }

  return <Random from={10} to={20} />;
});

story.add('Render state from constructor', () => {
  const getRandomNumber = (from = 0, to = 1) => {
    return from + Math.floor(Math.random() * (to - from));
  }

  class Random extends Component {
    constructor(props) {
      super(props);
      this.state = {
        randomValue: getRandomNumber(this.props.from, this.props.to),
      }
    }

    render() {
      return (
        <div>Random: {this.state.randomValue}!</div>
      );
    }
  }

  return <Random from={10} to={20} />;
});

story.add('Props validation and default values', () => {
  const getRandomNumber = (from = 0, to = 1) => {
    return from + Math.floor(Math.random() * (to - from));
  }

  class Random extends Component {
    static propTypes = {
      from: PropTypes.number,
      to: PropTypes.number,
    };

    static defaultProps = {
      from: 10,
      to: 20,
    };

    state = {
      randomValue: getRandomNumber(this.props.from, this.props.to),
    };

    render() {
      return (
        <div>Random: {this.state.randomValue}!</div>
      );
    }
  }

  return <Random />;
});

story.add('Component with setState(object)', () => {
  class ToggleButton extends Component {
    state = {
      active: false,
    };

    render() {
      const { active } = this.state;

      const handler = () => {
        this.setState({ active: !active });
      };

      this.x = 12;
      return (
        <span
          style={{
            padding: 5,
            border: active ? '1px solid black' : '1px solid gray',
            color: active ? 'white' : 'black',
            backgroundColor: active ? 'steelblue' : 'lightgray',
          }}
          onClick={handler}
        >{ this.props.children }</span>
      )
    }
  }

  return (
    <ToggleButton>Button</ToggleButton>
  );
});

story.add('Component with setState(function)', () => {
  class ToggleButton extends Component {
    state = {
      active: false,
    };

    render() {
      const { active } = this.state;

      const handler = () => {
        this.setState((state) => ({ active: !state.active }));
      };

      return (
        <span
          style={{
            padding: 5,
            border: active ? '1px solid black' : '1px solid gray',
            color: active ? 'white' : 'black',
            backgroundColor: active ? 'steelblue' : 'lightgray',
          }}
          onClick={handler}
        >{ this.props.children }</span>
      )
    }
  }

  return (
    <ToggleButton>Button</ToggleButton>
  );
});

story.add('Component state (Counter example)', () => {
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

story.add('Component method handler (auto bind)', () => {
  class Counter extends Component {
    constructor(props) {
      super(props);
      this.decrement = this.decrement.bind(this);
      this.increment = this.increment.bind(this);
      autoBind(this);
    }

    state = {
      value: 0,
    };

    decrement() {
      const { value } = this.state;
      this.setState({ value: value - 1 });
    }

    increment() {
      const { value } = this.state;
      this.setState({ value: value + 1 });
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
