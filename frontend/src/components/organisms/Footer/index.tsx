import React from 'react';
import { makeStyles,createStyles, Theme } from '@material-ui/core';
import { Box } from '@atoms';
import { Copyright } from '@molecules';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: '100%',
      position: 'sticky',
      bottom: 0,
    },
  }),
);

export const Footer = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Copyright />
    </Box>
  )
}
