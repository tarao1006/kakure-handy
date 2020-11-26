import * as React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';
import { NewOrderController } from '@organisms';
import { Item } from '@model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemRoot: {
      display: 'grid',
      gridTemplateColumns: '65% 1fr',
      justifyContent: 'space-between',
    },
  })
);

interface FoldedListItemProps {
  item: Item;
}

export const FoldedListItem: React.FC<FoldedListItemProps> = ({ item }) => {
  const classes = useStyles();

  return (
    <ListItem key={item.id} className={classes.itemRoot}>
      <div>
        {`${item.name}`}
      </div>
      <NewOrderController item={item} />
    </ListItem>
  )
}
