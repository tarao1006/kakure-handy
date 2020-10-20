import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routing from './routing';

const App = () => {

  return (
    <Routing />
  )
};

ReactDOM.render(
  <App />, document.getElementById('app')
);
