import React from 'react';
import { TextField } from '@atoms';

interface NewTableSelectProps {
  id: number;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label: string;
  options: React.ReactNode[];
}

export const NewTableSelect = ({
  id,
  handleChange,
  label,
  options
}: NewTableSelectProps): JSX.Element => {

  return (
    <>
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
        {options}
      </TextField>
    </>
  )
}
