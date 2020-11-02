import React from 'react';
import { Typography } from '@atoms';

export const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © Kakure ${new Date().getFullYear()}.`}
    </Typography>
  );
}
