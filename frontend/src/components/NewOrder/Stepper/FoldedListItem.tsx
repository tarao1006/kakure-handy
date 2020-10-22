import * as React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';
import Controller from './Controller';
import { Item } from '../../../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemRoot: {
      display: 'grid',
      gridTemplateColumns: '55% 15% 1fr',
      justifyContent: 'space-between',
    },
    input: {
      width: '5ch',
      padding: 0,
    },
  })
);

interface FoldedListItemProps {
  item: Item;
  handleSet: (item: Item) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

const FoldedListItem: React.FC<FoldedListItemProps> = ({ item, handleSet, increment, decrement }) => {
  const classes = useStyles();

  return (
    <ListItem key={item.id} className={classes.itemRoot}>
      <div>{`${item.name}`}</div>
      <div style={{textAlign: 'right'}}>{`${item.price}円`}</div>
      <Controller
        item={item}
        handleSet={handleSet}
        increment={increment}
        decrement={decrement}
      />
    </ListItem>
  )
}

export default FoldedListItem;
