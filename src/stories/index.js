import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

const es6Intro = storiesOf('ES6 Intro', module)

/*

  Übung 1.3
  =========

  Aufgabenstellung:

  Schreibe den untenstehenden Code von 1.2
  so um, dass:

  1. es eine Funktion `sayHello` gibt, die:
    + ein Argument `name` annimmt
    + ein `<h1>` mit dem Text "Hello, {name}!" zurückgibt

  2. rufe `sayHello` mit dem Argument "Boba Fett" auf
    + sayHello soll ein `<h1>` mit Text "Hello, Boba Fett!" zurückgeben
    + speichere den Rückgabewert dieses Aufrufs in der Variable `greeting`

  Außerdem:
  + die JavaScript-Konsole im Browser und ESLint sollen keine Fehler oder Warnungen werfen.
*/
es6Intro.add('let / const I ', _ => {
  const name = 'Darth Vader'
  const greeting = <h1>Hello, {name}!</h1>
  return greeting
})
