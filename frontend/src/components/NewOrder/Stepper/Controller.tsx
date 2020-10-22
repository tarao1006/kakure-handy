import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { Item } from '../../../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'space-between',
    },
    menuItem: {
      textAlign: 'center',
    }
  })
);

let numList = [];
for (let i = 0; i <= 15; ++i) {
  numList.push(i);
}

const NumberSelectList = ({ value, handleChange }) => {
  const classes = useStyles();

  return (
    <Select value={value} onChange={handleChange}>
      {
        numList.map(num => (
          <MenuItem key={num} value={num} className={classes.menuItem}>
            {num}
          </MenuItem>
        ))
      }
    </Select>
  )
}

interface FoldedListItemProps {
  item: Item;
  handleSet?: (item: Item) => void;
  increment?: (id: number) => void;
  decrement?: (id: number) => void;
}

const Controller: React.FC<FoldedListItemProps> = ({ item, handleSet, increment, decrement }) => {
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    let newItem = new Item(item.id, item.categoryId, item.subcategoryId, item.name, item.price) as Item;
    const newValue = e.target.value as number;
    newItem.count = newValue;
    handleSet(newItem);
  }

  const handleIncrement = () => {
    increment(item.id);
  }

  const handleDecrement = () => {
    decrement(item.id);
  }

  return (
    <div className={classes.icon}>
      <IconButton size='small' onClick={handleDecrement}>
        <Remove />
      </IconButton>
      <FormControl>
        <NumberSelectList value={item.count} handleChange={handleChange} />
      </FormControl>
      <IconButton size='small' onClick={handleIncrement}>
        <Add />
      </IconButton>
    </div>

  )
}

export default Controller;
