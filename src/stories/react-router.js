import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import StoryRouter from 'storybook-router';

const story = storiesOf('react-router', module);

story.addDecorator(StoryRouter());

//
// LINKING
//

story.add('Link', () => {
  return (
    <div>
      <Link to="/test">Test link</Link><br/>
      <Link to="/test" replace>Test link</Link><br/>

      <Link to={{
        pathname: '/test',
        search: '?sort=name',
        hash: '#the-hash',
        state: { fromDashboard: true }
        }}
      >Test link</Link><br/>
    </div>
  );
});

story.add('NavLink', (props) => {
    console.log('props', props);
  return (
    <div>
      <NavLink to="/test">Test link</NavLink><br/>
      <NavLink to="/test" exact>Test link</NavLink><br/>
      <NavLink to="/test" strict>Test link</NavLink><br/>
      <NavLink to="/test" activeClassName="selected">Test link</NavLink><br/>
      <NavLink to="/" exact activeStyle={{ fontWeight: 'bold', color: 'red' }}>Home</NavLink><br/>
      <NavLink to="/test" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Test link</NavLink><br/>

      <NavLink to={{
        pathname: '/test',
        search: '?sort=name',
        hash: '#the-hash',
        state: { fromDashboard: true }
        }}
      >Test link</NavLink><br/>

      <NavLink to="/test" replace>Test link</NavLink><br/>
    </div>
  );
});
