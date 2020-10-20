import * as React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
  Select,
  MenuItem,
  IconButton,
  FormControl
} from '@material-ui/core';
import {
  Add,
  Remove
} from '@material-ui/icons';

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
  id: number;
  name: string;
  defaultValue?: number;
  onChange?: (id: number, name: string, value: number) => void;
}

const FoldedListItem: React.FC<FoldedListItemProps> = ({ id, name, defaultValue, onChange }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = e.target.value as number;
    setValue(newValue);
    onChange(id, name, newValue)
  }

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange(id, name, newValue);
  }

  const handleDecrement = () => {
    if (value <= 0) {
      return;
    }
    const newValue = value - 1;
    setValue(newValue);
    onChange(id, name, newValue)
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

export default FoldedListItem;
