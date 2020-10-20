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
  CssBaseline,
  Link
} from '@material-ui/core';
import useUser, { UserStatus } from '../hooks/useUser';
import { withRouter, useHistory, RouteComponentProps } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    invisibleSpace: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
    }
  }),
);

interface HeaderProps {
  userStatus: UserStatus
}

const Header: React.FC<HeaderProps> = ({ userStatus }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(!!userStatus.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const { logout } = useUser();
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (userStatus.user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [userStatus]);

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

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Link href='/' color="inherit">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Link>
          <div className={classes.invisibleSpace} />
          {auth &&
            <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
              <ExpandMoreIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
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
                <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
