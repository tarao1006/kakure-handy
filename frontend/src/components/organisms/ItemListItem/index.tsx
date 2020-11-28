import React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { ListItem } from '@atoms';
import { NewOrderController } from '@organisms';
import { Item } from '@model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      display: 'grid',
      gridTemplateColumns: '65% 1fr',
      justifyContent: 'space-between',
    },
  })
);

interface ItemListItemProps {
  item: Item;
}

export const ItemListItem = ({ item }: ItemListItemProps): JSX.Element => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <div>{`${item.name}`}</div>
      <NewOrderController item={item} />
    </ListItem>
  )
}
