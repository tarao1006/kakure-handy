import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import { 
  Button,
  Container,
  Typography
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

const useTopStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const LinkButton = ({ to, children }) => {
  const history = useHistory();
  const classes = useTopStyles();

  const handleClick = () => {
    history.push(to);
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleClick}
      fullWidth
      className={classes.button}
    >
      <Typography variant="h5">
        {children}
      </Typography>
    </Button>
  )
}

export const Top = () => {
  const classes = useTopStyles();
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      {currentUser === undefined
      ? <></>
      : currentUser
      ? (
        <>
          <LinkButton to="/tables">
            テーブル一覧
          </LinkButton>
          <LinkButton to="/new-order">
            新規注文
          </LinkButton>
        </>
      )
      : (
        <LinkButton to="/login">
          ログイン
        </LinkButton>
      )
      }
    </Container>
  )
}
