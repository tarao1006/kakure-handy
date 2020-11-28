import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@atoms';
import { Table } from '@model';

interface SelectTableListProps {
  tables: Table[];
  value: Table;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectTableList = ({
  tables,
  value,
  handleChange
}: SelectTableListProps): JSX.Element => {

  return (
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
  )
}
