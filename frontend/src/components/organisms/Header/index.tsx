import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@atoms';
import { MenuIcon, KeyboardArrowLeftIcon } from '@icons';
import { Navigation } from '@molecules';
import { AuthContext, LayoutContext } from '@contexts';
import { logout } from '@modules';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    invisibleSpace: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
    },
    backButton: {
      height: 64,
    }
  }),
);

export const Header = (): JSX.Element => {
  const { currentUser } = React.useContext(AuthContext);
  const { headerTitle, setHeaderTitle } = React.useContext(LayoutContext);
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
    setHeaderTitle("");
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

  const handleAddTable = () => {
    setHeaderTitle("新規部屋");
    history.push('/new-table')
  }

  const handleAddOrder = () => {
    setHeaderTitle("新規注文");
    history.push('/new-order')
  }

  const handleNotification = () => {}

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" disableFocusRipple disableRipple onClick={handleClick}>
            {location.pathname === '/' ? <MenuIcon /> : <KeyboardArrowLeftIcon />}
          </IconButton>
          {headerTitle !== "" && <Typography variant="h6" >{headerTitle}</Typography>}
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
