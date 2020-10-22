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
  targetTable: Table | undefined;
}

export const SelectTable: React.FC<SelectTableProps> = ({ tables, handleSet, targetTable }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<Table | undefined>(targetTable);

  React.useEffect(() => {
    setValue(targetTable);
  }, [targetTable]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number.parseInt(e.target.value);
    const table = tables.find(table => table.id === id);
    setValue(table);
    handleSet(table);
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">
        部屋を選択してください。
      </FormLabel>
      <RadioGroup value={value === undefined ? 0 : value.id} onChange={handleChange} className={classes.content}>
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