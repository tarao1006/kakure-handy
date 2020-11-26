import * as React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import { Table } from '@model';
import useTables from '../../../hooks/useTables';

export const SelectTable: React.FC<{}> = () => {
  const { tables, targetTable, updateTable } = useTables();
  const [value, setValue] = React.useState<Table | undefined>(targetTable);

  React.useEffect(() => {
    setValue(targetTable);
  }, [targetTable]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number.parseInt(e.target.value);
    const table = tables.find(table => table.id === id);
    setValue(table);
    updateTable(table);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        部屋を選択してください。
      </FormLabel>
      <RadioGroup value={value === undefined ? 0 : value.id} onChange={handleChange}>
        {
          tables.map(table => (
            <FormControlLabel
              key={table.id}
              value={table.id}
              control={<Radio color="primary" />}
              label={table.room.name}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  )
}
