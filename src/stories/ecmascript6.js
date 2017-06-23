import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const story = storiesOf('EcmaScript 6', module);

//
// CONST / LET
//

story.add('const', () => {
  const a = 1;
  //a = 2;
  return <div>{ a }</div>;
});

story.add('const Objekte', () => {
  const user = {
    username: 'Max',
    password: 'secret',
  };

  user.password = 'changed'; // Ooops.. No Error!

  return <div>{ JSON.stringify(user) }</div>;
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

story.add('var summe', () => {
  var sum = 0;

  for (var i = 1; i <= 5; i++) {
    sum += i;
  }

  return <div>{ sum }</div>;
});

story.add('var hoisting fehler', () => {
  const lazy = [];

  var sum = 0;

  for (var i = 1; i <= 5; i++) {
    lazy.push(function() {
      console.log('Add', i);
      sum += i;
    });
  }

  console.log(lazy);

  for (var i = 0; i < lazy.length; i++) {
    lazy[i]();
  }

  return <div>{ sum }</div>;
});

//
// ARRAY FUNCTION
//

story.add('Array function forEach', () => {
  const articles = [
    { name: "Cola", amount: 6, price: 0.99 },
    { name: "Mate", amount: 4, price: 1.79 },
    { name: "Bier", amount: 20, price: 0.79 },
  ];

  let string = '';

  articles.forEach(function(article) {
    string += article.name + ' ';
  })

  articles.forEach((article) => {
    string += article.name + ' ';
  })

  return <div>{ string }</div>;
});

story.add('Array function map name', () => {
  const articles = [
    { name: "Cola", amount: 6, price: 0.99 },
    { name: "Mate", amount: 4, price: 1.79 },
    { name: "Bier", amount: 20, price: 0.79 },
  ];

  const names1 = articles.map(function(article) {
    return article.name;
  })

  const names2 = articles.map((article) => {
    return article.name;
  })

  const names3 = articles.map(article => article.name)

  return <div>{ names1.join(' ') }</div>;
});

story.add('Array function filter price', () => {
  const articles = [
    { name: "Cola", amount: 6, price: 0.99 },
    { name: "Mate", amount: 4, price: 1.79 },
    { name: "Bier", amount: 20, price: 0.79 },
  ];

  const cheapArticles = articles.filter((article) => article.price < 1);
  const expensiveArticles = articles.filter((article) => article.price >= 1);

  const names = cheapArticles.map(article => article.name)

  return <div>{ 'Cheap: ' + names.join(' ') }</div>;
});

story.add('Array function filter and map chaining', () => {
  const articles = [
    { name: "Cola", amount: 6, price: 0.99 },
    { name: "Mate", amount: 4, price: 1.79 },
    { name: "Bier", amount: 20, price: 0.79 },
  ];

  const names = articles
      .filter((article) => article.price >= 1)
      .filter((article) => article.price < 2)
      .map(article => article.name)

  return <div>{ 'Articles: ' + names.join(' ') }</div>;
});

story.add('Array function reduce sum', () => {
  const articles = [
    { name: "Cola", amount: 6, price: 0.99 },
    { name: "Mate", amount: 4, price: 1.79 },
    { name: "Bier", amount: 20, price: 0.79 },
  ];

  const sum = articles
      .reduce((previousValue, currentValue, currentIndex, array) => (previousValue + currentValue.amount * currentValue.price), 0)

  const sum2 = articles
      .filter(article => article.price > 0.10)
      .map(article => article.amount * article.price)
      .map(price => Math.max(10, price)) // Min. 10 EUR pro Artikel(gruppe)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

  return <div>{ 'Sum: ' + sum2 }</div>;
});

//
// DEFAULT PARAMETER
//

story.add('Default parameters', () => {
  const random = (from = 0, to = 1) => {
    return from + Math.floor(Math.random() * (to - from));
  }

  return <div>{ 'Random 0-1: ' + random() + ' -- Random 10-20: ' + random(10, 20) }</div>;
});

//
// TEMPLATE STRINGS
//

story.add('Default parameters + template string', () => {
  const random = (from, to) => {
    return from + Math.floor(Math.random() * (to - from));
  }

  const from = 10;
  const to = 20;

  return <div>{ `Random number between ${from} and ${to}: ${random(from, to)}` }</div>;
});

//
// OBJECT LITERALS
//

story.add('Object literals', () => {
  const username = 'Max';
  const password = 's3cr3t';

  const user = {
    username,
    password,
  };

  return <div>{ JSON.stringify(user) }</div>;
});

story.add('Object literals with functions', () => {
  const username = 'Max';
  const password = 's3cr3t';

  const user = {
    username,
    password,
    getFunctionThis() {
      return this;
    },
    getArrayFunctionThis: () => {
      return this;
    },
  };

  return <div>{ JSON.stringify(user.getFunctionThis()) }</div>;
});

story.add('Object literals with dynamic properties', () => {
  // DO NOT DO THIS AT HOME...
  const USERNAME_PROPERTY_NAME = 'username';
  const PASSWORD_PROPERTY_NAME = Symbol('password');

  const username = 'Max';
  const password = 's3cr3t';

  const user = {
    [USERNAME_PROPERTY_NAME]: username,
    [PASSWORD_PROPERTY_NAME]: password, 
  };

  return <div>{ JSON.stringify(user) }</div>;
});

story.add('Object literals with get/set', () => {
  const username = 'Max';
  const password = 's3cr3t';

  const user = {
    username,
    get password() {
      return 'top secret';
    },
    set password(newValue) {
      this.password = newValue;
    },
  };

  return <div>{ JSON.stringify(user) }</div>;
});

//
// SPREAD OPERATOR
//

story.add('Spread operator for Arrays', () => {
  const a1 = [1, 2, 3];
  const a2 = [...a1, 4, 5, 6];
  const a3 = [4, 5, 6, ...a1];

  return <div>{ JSON.stringify(a3) }</div>;
});

story.add('Destructuring from an Array', () => {
  const geoPoint = {
    name: 'Kölner Dom',
    location: [6.9581446, 50.9412784],
  };

  const [ longitude, latitude ] = geoPoint.location;

  return <div>{ `${geoPoint.name} is at @ ${longitude} x ${latitude}` }</div>;
});

story.add('Spread operator for Objects', () => {
  const object1 = { name: 'Kölner Dom' };
  const object2 = { ...object1 };
  const object3 = { ...object1, name: 'Brauhaus am Dom', city: 'Köln' };
  const object4 = { name: 'Brauhaus am Dom', city: 'Köln', ...object1 };

  return <div>{ JSON.stringify(object4) }</div>;
});

story.add('Destructuring from an Object', () => {
  const geoPoint = {
    name: 'Kölner Dom',
    location: [6.9581446, 50.9412784],
  };

  const { name, location } = geoPoint;
  const [ longitude, latitude ] = location;

  return <div>{ `${name} is at @ ${longitude} x ${latitude}` }</div>;
});

story.add('Spread and destructuring example', () => {
  const copyReplace = (array, from, to, elements) => {
    return array.slice(0, from)
        .concat(elements)
        .concat(array.slice(to));
  };

  const copyReplace2 = (array, from, to, elements) => [
    ...array.slice(0, from),
    ...elements,
    ...array.slice(to)
  ];

  const result = copyReplace2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 9, [0, 0, 0]);

  return <div>{ JSON.stringify(result) }</div>;
});

story.add('Spread and destructuring example with rest', () => {
  const copyReplace = (array, from, to, ...elements) => {
    return array.slice(0, from)
        .concat(elements)
        .concat(array.slice(to));
  };

  const copyReplace2 = (array, from, to, ...elements) => [
    ...array.slice(0, from),
    ...elements,
    ...array.slice(to)
  ];

  const result = copyReplace2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 9, 0, 0, 0);

  return <div>{ JSON.stringify(result) }</div>;
});

story.add('Map', () => {
  const map = new Map();

  map.set('username', 'Max');
  map.set('password', 's3cr3t');
  map.set('password', 'more s3cr3t');
  map.get('username');
  map.has('username');
  map.size; // NOT map.length

  /*
  map.keys();
  map.values();
  map.entries();
  map.clear();
  */

  return <div>{ map.size }</div>;
});

story.add('Set', () => {
  const set = new Set();

  set.add(1);
  set.add(2);
  set.add(3);
  set.add(3);
  set.add(null);
  set.add(null);
  set.add(undefined);
  set.add(undefined);
  set.has(1);
  set.delete(1);
  set.size;

  /*
  set.keys();
  set.values();
  set.entries();
  set.clear();
  */

  return <div>{ set.size }</div>;
});

story.add('Map iterables', () => {
  const map = new Map();
  map.set('username', 'Max');
  map.set('password', 's3cr3t');

  let result = '-- ';
  // try keys(), values() and entries()
  for (let value of map) {
    result += value + ' -- ';
  }

  return <div>{ result }</div>;
});

story.add('Set iterables', () => {
  const set = new Set();

  set.add(1);
  set.add(2);
  set.add(3);

  let result = '-- ';
  // try keys(), values() and entries()
  for (let value of set) {
    result += value + ' -- ';
  }

  return <div>{ result }</div>;
});

story.add('Custom Iterator', () => {
  const range = (from, to) => {
    return {
      [Symbol.iterator]: () => {
        let i = from;
        return {
          next: () => {
            return {
              value: i,
              done: to < i++,
            };
          },
        }
      },
    }
  }

  let result = '-- ';
  // try keys(), values() and entries()
  for (let value of range(5, 10)) {
    result += value + ' -- ';
  }

  return <div>{ result }</div>;
});

story.add('Classes with extends/super', () => {
  class Point2d {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return `(${this.x}, ${this.y})`;
    }
  }

  class Point3d extends Point2d {
    constructor(x, y, z) {
      super(x, y, z);
      this.z = z;
    }

    toString() {
      return `${super.toString()} in ${this.z}`;
    }
  }

  const point3d = new Point3d(1, 2, 3);

  return <div>{ point3d.toString() }</div>;
});

story.add('Truthy null-check', () => {
  const user = {
    address: {
      city: 'Köln',
    },
  };

  const city = user && user.address && user.address.city;

  return <div>{ city }</div>;
});

story.add('Falsey null-check', () => {
  const user = {
  };

  const city = user && user.address && user.address.city || 'Unbekannt';

  return <div>{ city }</div>;
});
