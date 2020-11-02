import * as React from 'react';
import {
  createStyles,
  makeStyles
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { AppBar, IconButton, Toolbar } from '@atoms';
import { Navigation } from '@molecules';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import { logout } from '../../../modules/auth';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() =>
  createStyles({
    invisibleSpace: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
    },
  }),
);

export const Header: React.FC<{}> = () => {
  const { currentUser } = React.useContext(AuthContext);
  const classes = useStyles();
  const [auth, setAuth] = React.useState<boolean>(!!currentUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (currentUser !== undefined ) {
      if (currentUser) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
  }, [currentUser]);

  const handleClick = () => {
    history.push('/');
  }

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  }

  const handleLogin = () => {
    history.push('/login');
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <div className={classes.invisibleSpace} />
          {auth && <Navigation
            open={open}
            anchorEl={anchorEl}
            handleMenu={handleMenu}
            handleClose={handleClose}
            handleLogout={handleLogout}
          />}
        </Toolbar>
      </AppBar>
    </>
  );
}
