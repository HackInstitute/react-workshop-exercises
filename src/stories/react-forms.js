import React, { Component } from 'react';
import PropTypes from 'prop-types';

import autoBind from 'react-autobind';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const story = storiesOf('react forms', module);

const cars = [
  { title: 'Audi', value: 'audi' },
  { title: 'BMW', value: 'bmw' },
  { title: 'Mercedes', value: 'mercedes' },
  { title: 'Mini', value: 'mini' },
  { title: 'Volkswagen', value: 'volkswagen' },
];

story.add('Simple form', () => {
  class Form extends Component {

    handleSubmit = (event) => {
      const form = event.target;
      const formData = {
        gender: form.gender.value,
        name: form.name.value,
        age: form.age.value,
        car: form.car.value,
      };

      action('submit')(JSON.stringify(formData));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="radio" name="gender" value="female" /> Frau
          </label>
          <label>
            <input type="radio" name="gender" value="male" /> Herr
          </label><br/>
          <label>
            Name:
            <input type="text" name="name" />
          </label><br/>
          <label>
            Age:
            <input type="text" name="age" />
          </label><br/>
          <label>
            Car:
            <select name="car">
              { cars.map(car => <option value={car.value}>{car.title}</option>) }
            </select>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});

story.add('Simple form with refs', () => {
  class Form extends Component {

    handleSubmit = (event) => {
      const formData = {
        gender: this.female.checked ? 'female' : this.male.checked ? 'male' : null,
        name: this.name.value,
        age: this.age.value,
        car: this.car.value,
      };

      action('submit')(JSON.stringify(formData));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              ref={(female) => { this.female = female; }}
              type="radio"
              name="gender"
              value="female"
            />
            Frau
          </label>
          <label>
            <input
              ref={(male) => { this.male = male; }}
              type="radio"
              name="gender"
              value="male"
            />
            Herr
          </label><br/>
          <label>
            Name:
            <input
              ref={(name) => { this.name = name; }}
              type="text"
              name="name"
            />
          </label><br/>
          <label>
            Age:
            <input
              ref={(age) => { this.age = age; }}
              type="text"
              name="age"
            />
          </label><br/>
          <label>
            Car:
            <select ref={(car) => { this.car = car; }} name="car">
              { cars.map(car => <option value={car.value}>{car.title}</option>) }
            </select>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});

story.add('Simple form with state', () => {
  class Form extends Component {
    state = {
      name: 'Max',
      age: '28',
      car: 'mini',
    };

    /* Keep this to test the difference between value and defaultValue
    componentDidMount() {
      this.timer = setInterval(() => {
        this.forceUpdate();
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }
    */

    handleNameChange = (event) => {
      const value = event.target.value;
      action('name change')(value);
      this.setState({ name: value });
    }

    handleAgeChange = (event) => {
      const value = parseInt(event.target.value);
      action('age changed')(value);
      this.setState({ age: isNaN(value) ? '' : value.toString() });
    }

    handleCarChange = (event) => {
      action('car changed')(event.target.value);
      this.setState({ car: event.target.value });
    }

    handleSubmit = (event) => {
      action('submit')(JSON.stringify(this.state));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </label><br/>
          <label>
            Age:
            <input
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleAgeChange}
            />
          </label><br/>
          <label>
            Car:
            <select name="car" value={this.state.car} onChange={this.handleCarChange}>
              { cars.map(car => <option value={car.value}>{car.title}</option>) }
            </select>
          </label><br/>

          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});

story.add('Form components with local state', () => {
  class TextInput extends Component {
    state = { value: '' };

    handleChange = (event) => {
      this.setState({ value: event.target.value });
    }

    render() {
      return (
        <label>
          <span style={{ display: 'inline-block', minWidth: '140px' }}>
            { this.props.label }
          </span>
          <input
            type="text"
            name={ this.props.name }
            value={ this.state.value }
            onChange={ this.handleChange }
          />
        </label>
      )
    }
  }

  class NumberInput extends Component {
    state = { value: '' };

    handleChange = (event) => {
      const value = parseInt(event.target.value);
      this.setState({ value: isNaN(value) ? '' : value.toString() });
    }

    render() {
      return (
        <label>
          <span style={{ display: 'inline-block', minWidth: '140px' }}>
            { this.props.label }
          </span>
          <input
            type="text"
            name={ this.props.name }
            value={ this.state.value }
            onChange={ this.handleChange }
          />
        </label>
      )
    }
  }

  class Form extends Component {
    handleSubmit = (event) => {
      const formData = {
        // DO NOT DO THIS!
        // DO NOT ACCESS PRIVATE STATE OF OTHER COMPONENTS THIS WAY.
        firstname: this.firstname.state.value,
        lastname: this.lastname.state.value,
        age: this.age.state.value,
      }
      action('submit')(JSON.stringify(formData));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <TextInput label="Firstname:" ref={(firstname) => { this.firstname = firstname; }} /><br/>
          <TextInput label="Lastname:" ref={(lastname) => { this.lastname = lastname; }} /><br/>
          <NumberInput label="Age:" ref={(age) => { this.age = age; }} /><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});

story.add('Form components with props delegation', () => {
  class TextInput extends Component {
    render() {
      return (
        <label>
          <div>
            { this.props.label }
          </div>
          <input
            type="text"
            onChange={(event) => this.props.onValueChanged(event.target.value)}
            {...this.props}
          />
        </label>
      )
    }
  }

  class CommentInput extends Component {
    render() {
      return (
        <label>
          <div>
            { this.props.label }
          </div>
          <textarea
            onChange={(event) => this.props.onValueChanged(event.target.value)}
            {...this.props}
          />
        </label>
      )
    }
  }

  class Form extends Component {
    state = {
      name: '',
      email: '',
      comment: '',
    };

    handleSubmit = (event) => {
      action('submit')(JSON.stringify(this.state));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <TextInput
            type="text"
            label="Name:"
            value={this.state.name}
            onValueChanged={(name) => this.setState({ name })}
          /><br/>
          <TextInput
            type="text"
            label="E-Mail:"
            value={this.state.email}
            onValueChanged={(email) => this.setState({ email })}
          /><br/>
          <CommentInput
            label="Comment:"
            value={this.state.comment}
            onValueChanged={(comment) => this.setState({ comment })}
            cols="80"
            rows="10"
          /><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});
