import React from 'react';
import { Grid, CircularProgress } from '@atoms';

export const Loading = (): JSX.Element => {

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
