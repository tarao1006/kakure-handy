import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  Avatar,
  Box,
  Container,
  Typography,
} from '@atoms';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../../../hooks/useStyles';
import { Copyright, Loading } from '@molecules';
import { LogInForm } from '@organisms';

export const LogInTemplate = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const classes = useStyles();

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
        <LogInForm setIsLoading={setIsLoading} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>)
  );
}
