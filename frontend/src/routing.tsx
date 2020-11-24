import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, AuthContext } from './contexts/auth';
import { store } from './reducers';
import { Header } from '@organisms';
import { Loading } from '@molecules';
import {
  ForgetPassword,
  LogIn,
  MailSent,
  NewOrder,
  NewTable,
  OrderSuccess,
  TableDetail,
  Tables,
  Top
} from '@pages';

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

const LogInRoute = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Route
      path="/login"
      render={() => {
        if (currentUser === undefined) {
          return <Loading />
        } else {
          return currentUser === null ? <LogIn /> : <Redirect to="/" />
        }
      }}
    />
  )
}

const Routing = () => {

  return (
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Route
            path="/"
            exact
            component={Top}
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
            path='/table/:tableId'
            exact
            Child={TableDetail}
          />
          <RedirectRoute
            path='/new-table'
            Child={NewTable}
          />
          <Route
            path='/forget-password'
            exact
            component={ForgetPassword}
          />
          <Route
            path='/mail-sent'
            exact
            component={MailSent}
          />
          <Route
            path='/order-success'
            exact
            component={OrderSuccess}
          />
          <LogInRoute />
        </AuthProvider>
      </Provider>
    </Router>
  )
}

export default Routing;
