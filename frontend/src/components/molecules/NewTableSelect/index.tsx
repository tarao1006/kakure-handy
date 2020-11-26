import React from 'react';
import { TextField } from '@atoms';

interface NewTableSelectProps {
  id: number;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label: string;
  values: string[];
}

export const NewTableSelect = ({
  id,
  handleChange,
  label,
  values
}: NewTableSelectProps): JSX.Element => {

  return (
    <TextField
      fullWidth
      select
      value={id}
      color="primary"
      onChange={handleChange}
      label={label}
      margin="normal"
      SelectProps={{
        native: true,
      }}
    >
      {
        values.map((value, idx) => (
          <option key={idx + 1} value={idx + 1}>{value}</option>
        ))
      }
    </TextField>
  )
}
