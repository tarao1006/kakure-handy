import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './auth';
import LogIn from './components/LogIn';
import Top from './components/Top';
import Tables from './components/Tables';
import Table from './components/Table';
import NewOrder from './components/NewOrder';
import Loading from './components/Loading';
import Header from './components/Header';

interface RedirectRouteProps {
  path: string
  Child: React.FC
  exact?: boolean
}

const RedirectRoute: React.FC<RedirectRouteProps> = ({ path, Child, exact }) => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Route
      path={path}
      exact={exact}
      render={({ match }) => {
        if (currentUser === undefined) {
          return <Loading />
        } else {
          return currentUser !== null ? <Child /> : <Redirect to={`/login?redirect_to=${encodeURIComponent(match.url)}`} />
        }
      }}
    />
  )
}

const Routing = () => {

  return (
    <Router>
      <AuthProvider>
        <Header />
        <RedirectRoute
          path='/'
          exact
          Child={Top}
        />
        <RedirectRoute
          path='/tables'
          exact
          Child={Tables}
        />
        <RedirectRoute
          path='/new-order'
          Child={NewOrder}
        />
        <RedirectRoute
          path='/table/:id'
          exact
          Child={Table}
        />
        <Route path='/login' component={LogIn} />
      </AuthProvider>
    </Router>
  )
}

export default Routing;
