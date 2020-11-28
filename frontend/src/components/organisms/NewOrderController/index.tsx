import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, IconButton } from '@atoms';
import { AddCircleOutlineOutlinedIcon, RemoveCircleOutlineOutlinedIcon } from '@icons';
import { NumberSelect } from '@molecules';
import { Item, MIN_ORDER_COUNT, MAX_ORDER_COUNT } from '@model';
import { useItems } from '@hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
);

interface FoldedListItemProps {
  item: Item;
}

export const NewOrderController: React.FC<FoldedListItemProps> = ({ item }) => {
  const classes = useStyles();
  const { add, increment, decrement } = useItems();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newItem = new Item(item.id, item.name, item.price, item.category);
    newItem.count = Number.parseInt(e.target.value);
    add(newItem);
  }

  const handleIncrement = () => {
    increment(item.id);
  }

  const handleDecrement = () => {
    decrement(item.id);
  }

  return (
    <div className={classes.icon}>
      <IconButton size='small' onClick={handleDecrement} disabled={item.count <= MIN_ORDER_COUNT}>
        <RemoveCircleOutlineOutlinedIcon color="secondary" />
      </IconButton>
      <FormControl>
        <NumberSelect value={item.count} handleChange={handleChange} />
      </FormControl>
      <IconButton size='small' onClick={handleIncrement} disabled={item.count >= MAX_ORDER_COUNT}>
        <AddCircleOutlineOutlinedIcon color="primary" />
      </IconButton>
    </div>

  )
}
