import React, { Component } from 'react';
import PropTypes from 'prop-types';

import autoBind from 'react-autobind';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const story = storiesOf('react PropTypes', module);

story.add('PropType for a function component', () => {
  const HelloWorld1 = (props) => <div>Hello {props.name}!</div>;

  HelloWorld1.propTypes = {
    name: PropTypes.string.isRequired,
  }

  return <HelloWorld1 />;
});

story.add('PropType for a class component', () => {
  class HelloWorld2 extends Component {
    render() {
      return (
        <div>Hello {this.props.name}!</div>
      );
    }
  }

  HelloWorld2.propTypes = {
    name: PropTypes.string.isRequired,
  }

  return <HelloWorld2 />;
});

story.add('PropType for a class component with static', () => {
  class HelloWorld3 extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
    }

    render() {
      return (
        <div>Hello {this.props.name}!</div>
      );
    }
  }

  return <HelloWorld3 />;
});

story.add('PropType.number', () => {
  class Range extends Component {
    static propTypes = {
      tom: PropTypes.number.isRequired,
      to: PropTypes.number.isRequired,
    }

    render() {
      return (
        <div>{this.props.from} - {this.props.to}</div>
      );
    }
  }

  return <Range from={10} to={20} />;
});

story.add('PropType.oneOf (Enum)', () => {
  class Message extends Component {
    static propTypes = {
      variant: PropTypes.oneOf([ 'error', 'warning', 'info' ]).isRequired,
    }

    static styles = {
      error: {
        color: 'red',
        border: '1px solid red',
        backgroundColor: '#ffeeee',
      },
      warning: {
        color: 'orange',
        border: '1px solid orange',
        backgroundColor: '#ffffee',
      },
      info: {
        color: 'blue',
        border: '1px solid blue',
        backgroundColor: '#eeeeff',
      },
    }

    render() {
      return (
        <div style={Message.styles[this.props.variant]}>{this.props.children}</div>
      );
    }
  }

  return <Message variant="warning">This is a warning!</Message>;
});

story.add('PropType.oneOfType', () => {
  class Length extends Component {
    static propTypes = {
      input: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]).isRequired,
    }

    render() {
      return (
        <div>Length: {this.props.input.length}</div>
      );
    }
  }

  return <Length input={[1, 2, 3, 4, 5]} />;
});

story.add('PropType.arrayOf', () => {
  class List extends Component {
    static propTypes = {
      cars: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    render() {
      return (
        <ol>
          { this.props.cars.map((entry, index) => <li key={index}>{entry}</li>) }
        </ol>
      );
    }
  }

  const cars = [ 'Audi', 'BMW', 'Mini', 'VW' ];

  return <List cars={cars} />;
});

story.add('PropType.shape', () => {
  class CarDetail extends Component {
    static propTypes = {
      car: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
    }

    render() {
      return (
        <div>
          <strong>{ this.props.car.name }</strong><br/>
          NUR: { this.props.car.price } EUR
        </div>
      );
    }
  }

  return <CarDetail car={{ name: 'Mini Cooper S', price: 39999 }} />;
});

story.add('PropTypes.arrayOf(PropType.shape)', () => {
  class CarDetail extends Component {
    static propTypes = {
      car: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
    }

    render() {
      return (
        <div>
          <strong>{ this.props.car.name }</strong><br/>
          NUR: { this.props.car.price } EUR
        </div>
      );
    }
  }

  class CarList extends Component {
    static propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })).isRequired,
    }

    render() {
      return (
        <div>
          { this.props.data.map((car, index) => <CarDetail key={index} car={car} />) }
        </div>
      );
    }
  }

  const cars = [{ name: 'Mini Cooper', price: 29999 }, { name: 'Mini Cooper S', price: 39999 }];

  return <CarList data={cars} />;
});
