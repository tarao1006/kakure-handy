import * as React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';
import Controller from './Controller';
import { Item } from '../../../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemRoot: {
      display: 'grid',
      gridTemplateColumns: '70% 1fr',
      justifyContent: 'space-between',
    },
  })
);

interface FoldedListItemProps {
  item: Item;
}

const FoldedListItem: React.FC<FoldedListItemProps> = ({ item }) => {
  const classes = useStyles();

  return (
    <ListItem key={item.id} className={classes.itemRoot}>
      <div>
        {`${item.name}`}
      </div>
      <Controller item={item} />
    </ListItem>
  )
}

export default FoldedListItem;
