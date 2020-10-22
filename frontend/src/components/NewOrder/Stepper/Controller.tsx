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

interface FoldedListItemProps {
  item: Item;
  onChange?: (item: Item) => void;
}

const Controller: React.FC<FoldedListItemProps> = ({ item, onChange }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(item.count);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = e.target.value as number;
    setValue(newValue);
    let newItem = Object.assign(item) as Item;
    newItem.count = newValue;
    onChange(newItem);
  }

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    let newItem = Object.assign(item) as Item;
    newItem.count = newValue;
    onChange(newItem);
  }

  const handleDecrement = () => {
    if (value <= 0) {
      return;
    }
    const newValue = value - 1;
    setValue(newValue);
    let newItem = Object.assign(item) as Item;
    newItem.count = newValue;
    onChange(newItem)
  }

  return (
    <div className={classes.icon}>
      <IconButton size='small' onClick={handleDecrement}>
        <Remove />
      </IconButton>
      <FormControl>
        <Select
          value={value}
          onChange={handleChange}
        >
        {
          numList.map(num => (
            <MenuItem key={num} value={num} className={classes.menuItem}>
              {num}
            </MenuItem>
          ))
        }
        </Select>
      </FormControl>
      <IconButton size='small' onClick={handleIncrement}>
        <Add />
      </IconButton>
    </div>

  )
}

export default Controller;
