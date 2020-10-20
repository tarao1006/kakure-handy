import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Theme, createStyles, makeStyles, Button, Typography } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        // width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }),
);

const LinkButton = ({ to, children }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(to);
  }

  return (
    <Button
    variant="outlined"
    color="primary"
    onClick={handleClick}>
      <Typography variant="h5">
        {children}
      </Typography>
    </Button>
  )
}

const Top = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <LinkButton to="/tables">
          テーブル一覧
        </LinkButton>
        <LinkButton to="/new-order">
          新規注文
        </LinkButton>
      </ThemeProvider>
    </div>
  )
}

export default Top;
