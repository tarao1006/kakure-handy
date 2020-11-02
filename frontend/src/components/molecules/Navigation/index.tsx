import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@atoms';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const Navigation = ({ open, handleMenu, anchorEl, handleClose, handleLogout }) => {

  return (
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
  )
}