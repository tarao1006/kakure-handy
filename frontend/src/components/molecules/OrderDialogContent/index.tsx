import React from 'react';
import { Typography } from '@atoms';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    value: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

interface OrderDialogContentProps {
  topic: string;
  value: string | number;
}

export const OrderDialogContent = ({
  topic,
  value
}: OrderDialogContentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="body1">
        {topic}
      </Typography>
      <Typography variant="body1" className={classes.value}>
        {value}
      </Typography>
    </div>
  )
}
