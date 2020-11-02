import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  IconButton,
  TextField
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { Item, MIN_ORDER_COUNT, MAX_ORDER_COUNT } from '../../../../model';
import useItems from '../../../../hooks/useItems';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'space-between',
    },
  })
);

let numList = [];
for (let i = 0; i <= MAX_ORDER_COUNT; ++i) {
  numList.push(i);
}

const NumberSelectList = ({ value, handleChange }) => {

  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      SelectProps={{
        native: true,
      }}
    >
      {
        numList.map(num => (
          <option key={num} value={num}>
            {num}
          </option>
        ))
      }
    </TextField>
  )
}

interface FoldedListItemProps {
  item: Item;
}

const Controller: React.FC<FoldedListItemProps> = ({ item }) => {
  const classes = useStyles();
  const { add, increment, decrement } = useItems();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newItem = new Item(item.id, item.categoryId, item.subcategoryId, item.name, item.price);
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
        <Remove />
      </IconButton>
      <FormControl>
        <NumberSelectList value={item.count} handleChange={handleChange} />
      </FormControl>
      <IconButton size='small' onClick={handleIncrement} disabled={item.count >= MAX_ORDER_COUNT}>
        <Add />
      </IconButton>
    </div>

  )
}

export default Controller;
