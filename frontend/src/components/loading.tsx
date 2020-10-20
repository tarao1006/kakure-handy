import * as React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const Loading = () => {

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ position: "absolute", top: "0", bottom: "0" }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
}

export default Loading;
