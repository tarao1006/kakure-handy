import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, AuthContext } from './auth';
import { store } from './hooks/useItems';
import Header from './components/Header';
import Loading from './components/Loading';
import Top from './components/Top';
import Tables from './components/Tables';
import NewOrder from './components/NewOrder';
import Table from './components/Table';
import LogIn from './components/LogIn';
import ForgetPassword from './components/ForgetPassword';
import MailSent from './components/MailSent';

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
            path='/table/:id'
            exact
            Child={Table}
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
          <LogInRoute />
        </AuthProvider>
      </Provider>
    </Router>
  )
}

export default Routing;
