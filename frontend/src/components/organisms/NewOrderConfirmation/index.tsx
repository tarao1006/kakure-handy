import * as React from 'react';
import {
  FormControl,
  FormLabel,
  List,
  Typography
} from '@material-ui/core';
import { FoldedListItem } from '@organisms';
import useItems from '../../../hooks/useItems';
import useTables from '../../../hooks/useTables';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    tabRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    scrollArea: {
      width: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
    },
  }),
);

export const NewOrderConfirmation: React.FC<{}> = () => {
  const { targetItems } = useItems();
  const { targetTable } = useTables();
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">
        注文を確定してください。
      </FormLabel>
      <div>
        テーブル
      </div>
      <Typography component='h1' variant='h5' style={{textAlign: 'center'}}>
        {targetTable.room.name}
      </Typography>
      <div>
        メニュー
      </div>
      <List>
        {
          targetItems.map(item => <FoldedListItem key={item.id} item={item} />)
        }
      </List>
    </FormControl>
  )
}
