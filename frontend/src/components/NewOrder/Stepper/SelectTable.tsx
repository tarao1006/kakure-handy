import * as React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import useStyles from './base';
import { Table } from '../../../model';

interface SelectTableProps {
  tables: Table[];
  handleSet: (table: Table) => void;
  defaultValue?: Table;
}

export const SelectTable: React.FC<SelectTableProps> = ({ tables, handleSet, defaultValue }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    if (defaultValue) setValue(defaultValue.id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number.parseInt(e.target.value);
    setValue(id);
    handleSet(tables.find(table => table.id === id));
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">
        部屋を選択してください。
      </FormLabel>
      <RadioGroup value={value} onChange={handleChange} className={classes.content}>
        {
          tables.map(table => (
            <FormControlLabel
              key={table.id}
              value={table.id}
              control={<Radio color="primary" />}
              label={table.roomName}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  )
}
