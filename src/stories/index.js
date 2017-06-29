// fix async/await in storybook
window.regeneratorRuntime = require('babel-runtime/regenerator')

require('./ecmascript6');
require('./async');
require('./react-basics');
require('./react-functional-components');
require('./react-class-components');
require('./react-forms');
require('./react-router');
require('./redux');

require('./scratch')
