import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, AuthContext } from './contexts/auth';
import { store } from './reducers';
import { Loading } from '@molecules';
import {
  ForgetPassword,
  LogIn,
  MailSent,
  NewOrder,
  NewTable,
  NewOrderSuccess,
  TableDetail,
  Tables,
} from '@pages';
import { Layout } from './laytout';

interface RedirectRouteProps {
  path: string;
  children: React.ReactNode;
  exact?: boolean;
}

const RedirectRoute = ({
  path,
  children,
  exact
}: RedirectRouteProps): JSX.Element => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Route
      path={path}
      exact={exact}
      render={({ match }) => {
        if (currentUser === undefined) {
          return <Loading />
        } else {
          return currentUser !== null ? children : <Redirect to={`/login?redirect_to=${encodeURIComponent(match.url)}`} />
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
          <Layout>
            <RedirectRoute
              path='/'
              exact
              children={<Tables />}
            />
            <RedirectRoute
              path='/new-order'
              children={<NewOrder />}
            />
            <RedirectRoute
              path='/table/:tableId'
              exact
              children={<TableDetail />}
            />
            <RedirectRoute
              path='/new-table'
              children={<NewTable />}
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
              component={NewOrderSuccess}
            />
            <LogInRoute />
          </Layout>
        </AuthProvider>
      </Provider>
    </Router>
  )
}

export default Routing;
