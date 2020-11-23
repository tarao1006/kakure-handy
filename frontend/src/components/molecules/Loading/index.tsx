import React from 'react';
import { Grid, CircularProgress } from '@atoms';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      zIndex: theme.zIndex.appBar - 10,
      backgroundColor: "white",
      opacity: 0.5,
    }
  })
)

export const Loading = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}
