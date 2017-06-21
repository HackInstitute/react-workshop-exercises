import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const story = storiesOf('EcmaScript 6', module);

story.add('const', () => {
  const a = 1;
  //a = 2;
  return <div>{ a }</div>;
});

story.add('let', () => {
  let a = 1;
  //a = 2;
  return <div>{ a }</div>;
});

story.add('var', () => {
  var a = 1;
  return <div>{ a }</div>;
});

story.add('Array function forEach', () => {
  const data = [1, 2, 3, 4, 5];

  let string = '';

  data.forEach(function(entry) {
    string += entry + ' ';
  })

  data.forEach((entry) => {
    string += entry + ' ';
  })

  return <div>{ string }</div>;
});

story.add('Array function map', () => {
  const dataArray = [1, 2, 3, 4, 5];

  const result = dataArray.map(function(entry) {
    return entry * 2;
  })

  const result2 = dataArray.map((entry) => {
    return entry * 2;
  })

  const result3 = dataArray.map(entry => entry * 2)

  return <div>{ result.join(' ') }</div>;
});

story.add('Array function map chaining', () => {
  const dataArray = [1, 2, 3, 4, 5];

  const result = dataArray
      .map(entry => entry + 100)
      .map(entry => entry * 10);

  return <div>{ result.join(' ') }</div>;
});

story.add('Array function filter', () => {
  const dataArray = [1, 2, 3, 4, 5];

  const result = dataArray
      .filter(entry => entry % 2 === 0);

  return <div>{ result.join(' ') }</div>;
});
