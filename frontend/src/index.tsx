import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routing from './routing';
import Header from './components/header';
import useUser from './hooks/useUser';

const App = () => {
  const { userStatus } = useUser();

  return (
    <div>
      <Header userStatus={userStatus} />
      <Routing userStatus={userStatus} />
    </div>
  )
}

ReactDOM.render(
  <App />, document.getElementById('app')
)
