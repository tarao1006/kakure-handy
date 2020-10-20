import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import LogIn from './components/logIn';
import Top from './components/top';
import Tables from './components/tables';
import Table from './components/table';
import NewOrder from './components/NewOrder';
import Loading from './components/loading';
import { UserStatus } from './hooks/useUser';

interface RedirectRouteProps {
  path: string
  userStatus: UserStatus
  Child: React.FC
  exact?: boolean
}

const RedirectRoute: React.FC<RedirectRouteProps> = ({ path, userStatus, Child, exact }) => {

  return (
    <Route
      path={path}
      exact={exact}
      render={({ match }) => {
        if (!userStatus.updated) {
          return <Loading />
        } else {
          return userStatus.user ? <Child /> : <Redirect to={`/login?redirect_to=${encodeURIComponent(match.url)}`} />
        }
      }}
    />
  )
}

const Routing = ({ userStatus }) => {

  return (
    <Router>
      <RedirectRoute
        path='/'
        exact
        userStatus={userStatus}
        Child={Top}
      />
      <RedirectRoute
        path='/tables'
        exact
        userStatus={userStatus}
        Child={Tables}
      />
      <RedirectRoute
        path='/new-order'
        userStatus={userStatus}
        Child={NewOrder}
      />
      <RedirectRoute
        path='/table/:id'
        exact
        userStatus={userStatus}
        Child={Table}
      />
      <Route path='/login' render={() => {
        if (!userStatus.updated) {
          return <Loading />
        } else {
          return userStatus.user ? <Redirect to='/' /> : <LogIn />
        }}
      } />
    </Router>
  )
}

export default Routing;
