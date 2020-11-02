import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/MailOutlined';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../hooks/useStyles';
import Loading from './Loading'
import Copyright from './Copyright';
import { resetEmail } from '../modules/auth';

const defaultEmailAddress = "user01@example.co";

const ForgetPassword = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [emailAddress, setEmailAddress] = React.useState<string>(defaultEmailAddress);
  const classes = useStyles();
  const history = useHistory();

  const handleEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!reg.test(emailAddress)) {
      setIsError(true);
      return;
    }
    setIsLoading(true);
    resetEmail(emailAddress).then(() => {
      history.push('/mail-sent');
    }).catch(e => {
      console.log(e.message);
      setIsLoading(false);
      setOpen(true);
    });
  }

  const handleBackToTop = () => {
    history.push('/')
  }

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    isLoading
    ? <Loading />
    :
    (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          パスワード再設定メールを送る
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={isError}
            helperText={isError ? "正しいメールアドレスを入力してください" : ""}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            送信
          </Button>
          <Grid container alignContent='center' justify='center'>
            <Grid item>
              <Link component="button" variant="body2" onClick={handleBackToTop}>
                トップに戻る
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="メールの送信に失敗しました。"
        ContentProps={{
          style: {
            background: '#f44336'
          }
        }}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>)
  );
}

export default ForgetPassword;
