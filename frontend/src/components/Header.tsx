import * as React from 'react';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Typography,
  CssBaseline
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext, logout } from '../modules/auth';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    invisibleSpace: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
    },
  }),
);

const Header: React.FC<{}> = () => {
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
          {auth &&
            <div>
              <IconButton
                edge="end"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  ログアウト
                </MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
