import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import useStyles from '../../hooks/useStyles';

const OrderSuccess = () => {
  const history = useHistory();
  const classes = useStyles();

  React.useEffect(() => {
    setTimeout(() => history.push('/'), 600);
  }, [])

  const handleBackToTop = () => {
    history.push('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PriorityHighIcon />
        </Avatar>
        <Typography component='h1' align='center' variant='h6'>
          注文が完了しました
        </Typography>
        <Grid container alignContent='center' justify='center'>
          <Grid item>
            <Link component="button" variant="body2" onClick={handleBackToTop}>
              トップにリダイレクトします
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default OrderSuccess;
