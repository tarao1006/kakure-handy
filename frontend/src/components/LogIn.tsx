import * as React from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { login } from '../modules/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../hooks/useStyles';
import Loading from './Loading'
import Copyright from './Copyright';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const defaultEmailAddress = "user01@example.com";
const defaultPassword = "password"

const LogIn = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [emailAddress, setEmailAddress] = React.useState(defaultEmailAddress);
  const [password, setPassword] = React.useState(defaultPassword);
  const [checked, setChecked] = React.useState(true);
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();

  const handleEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(emailAddress, password, checked);
    history.push(query.get('redirect_to') ?? '/');
  }

  const handleCheckbox = () => {
    setChecked(!checked);
  }

  const handleForgetPassword = () => {
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
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={emailAddress}
            onChange={handleEmailAddress} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox checked={checked} color="primary" onChange={handleCheckbox} />}
            label="パスワードを保存する"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ログイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" onClick={handleForgetPassword}>
                パスワードを忘れた場合
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>)
  );
}

export default LogIn;
