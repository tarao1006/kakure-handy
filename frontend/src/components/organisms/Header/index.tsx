import * as React from 'react';
import {
  createStyles,
  makeStyles
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { AppBar, IconButton, Toolbar } from '@atoms';
import { Navigation } from '@molecules';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import { logout } from '../../../modules/auth';
import { MenuIcon, KeyboardArrowLeftIcon } from '@icons';

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
  const location = useLocation();
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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

  const handleAddTable = () => {
    history.push('/new-table')
  }

  const handleAddOrder = () => {
    history.push('/new-order')
  }

  const handleNotification = () => {}

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {
            location.pathname === '/'
            ? (
              <IconButton edge="start" color="inherit" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
            )
            : (
              <IconButton edge="start" color="inherit" onClick={handleClick}>
                <KeyboardArrowLeftIcon />
              </IconButton>
            )
          }
          <div className={classes.invisibleSpace} />
          {auth && <Navigation
            open={open}
            anchorEl={anchorEl}
            handleMenu={handleMenu}
            handleClose={handleClose}
            handleLogout={handleLogout}
            handleAddTable={handleAddTable}
            handleAddOrder={handleAddOrder}
            handleNotification={handleNotification}
          />}
        </Toolbar>
      </AppBar>
    </>
  );
}
