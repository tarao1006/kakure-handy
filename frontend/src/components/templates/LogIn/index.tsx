import * as React from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import {
  Avatar,
  Box,
  Container,
  Typography,
} from '@atoms';
import { login } from '../../../modules/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../../../hooks/useStyles';
import { Copyright, Loading } from '@molecules';
import { LogInForm } from '@organisms';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const defaultEmailAddress = "user01@example.com";
const defaultPassword = "password"

export const LogInTemplate = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState(defaultEmailAddress);
  const [password, setPassword] = React.useState(defaultPassword);
  const [checked, setChecked] = React.useState(true);
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password, checked);
    history.push(query.get('redirect_to') ?? '/');
  }

  const handleForgetPassword = (): void => {
    history.push('/forget-password');
  }

  return (
    isLoading
    ? <Loading />
    :
    (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <LogInForm
          email={email}
          password={password}
          checked={checked}
          setEmail={setEmail}
          setPassword={setPassword}
          setChecked={setChecked}
          handleSubmit={handleSubmit}
          handleForgetPassword={handleForgetPassword}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>)
  );
}
