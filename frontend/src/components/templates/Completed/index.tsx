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
import useStyles from '../../../hooks/useStyles';

export const Completed = ({ topic }: { topic: string}): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();

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
          {topic}
        </Typography>
        <Grid container alignContent='center' justify='center'>
          <Grid item>
            <Link component="button" variant="body2" onClick={handleBackToTop}>
              トップに戻る
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
