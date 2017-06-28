import React, { Component } from 'react';
import PropTypes from 'prop-types';

import autoBind from 'react-autobind';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const story = storiesOf('react forms', module);

story.add('Simple form', () => {
  class Form extends Component {
    state = {
      i: 0,
      name: '',
      age: '',
    };

    componentDidMount() {
      this.timer = setInterval(() => {
        this.setState(({ i }) => ({ i: i + 1 }));
      }, 1000);
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

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

    handleSubmit = (event) => {
      action('submit')(JSON.stringify(this.state));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <p>i = { this.state.i }</p>
          <label>
            Name:
            <input
              type="text"
              name="name"
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
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});

story.add('Simple registration form', () => {
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
    state = {
    };

    handleSubmit = (event) => {
      action('submit')(JSON.stringify(this.state));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <TextInput label="Firstname:" /><br/>
          <TextInput label="Lastname:" /><br/>
          <NumberInput label="Age:" /><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});

story.add('Simple registration form with props', () => {
  class TextInput extends Component {
    handleChange = (event) => {
      this.props.onValueChanged(event.target.value);
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
            value={ this.props.value }
            onChange={ this.handleChange }
          />
        </label>
      )
    }
  }

  class NumberInput extends Component {
    handleChange = (event) => {
      const value = parseInt(event.target.value);
      this.props.onValueChanged(isNaN(value) ? '' : value.toString());
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
            value={ this.props.value }
            onChange={ this.handleChange }
          />
        </label>
      )
    }
  }

  class Form extends Component {
    state = {
      firstname: '',
      lastname: '',
      age: '',
    };

    handleSubmit = (event) => {
      action('submit')(JSON.stringify(this.state));
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <TextInput
            label="Firstname:"
            value={this.state.firstname}
            onValueChanged={(firstname) => this.setState({ firstname })}
          /><br/>
          <TextInput
            label="Lastname:"
            value={this.state.lastname}
            onValueChanged={(lastname) => this.setState({ lastname })}
          /><br/>
          <NumberInput
            label="Age:"
            value={this.state.age}
            onValueChanged={(age) => this.setState({ age })}
          /><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return <Form />
});

story.add('Simple contact form', () => {
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
