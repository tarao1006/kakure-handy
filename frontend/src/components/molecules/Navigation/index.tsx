import * as React from 'react';
import {
  IconButton,
  Menu,
  MenuItem
} from '@atoms';
import {
  AccountCircle,
  Add,
  ExpandMore,
  NotificationsIcon,
  PostAdd
} from '@icons';

interface NavigationProps {
  open: boolean;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: Element;
  handleClose: () => void;
  handleLogout: () => void;
  handleAddTable: () => void;
  handleAddOrder: () => void;
  handleNotification: () => void;
}

export const Navigation = ({
  open,
  handleMenu,
  anchorEl,
  handleClose,
  handleLogout,
  handleAddTable,
  handleAddOrder,
  handleNotification
}: NavigationProps): JSX.Element => {

  return (
    <div>
    <IconButton
      edge="end"
      onClick={handleAddTable}
      color="inherit"
    >
      <Add />
    </IconButton>
    <IconButton
      edge="end"
      onClick={handleAddOrder}
      color="inherit"
    >
      <PostAdd />
    </IconButton>
    <IconButton
      edge="end"
      onClick={handleNotification}
      color="inherit"
    >
      <NotificationsIcon />
    </IconButton>
    <IconButton
      edge="end"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle />
      <ExpandMore />
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
  )
}