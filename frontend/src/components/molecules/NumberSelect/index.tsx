import React from 'react';
import { TextField } from '@atoms';
import { MAX_ORDER_COUNT } from '@model';

interface NumberSelectProps {
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const numList = Array.from({length: MAX_ORDER_COUNT + 1}, (v, k) => k);

export const NumberSelect = ({
  value,
  handleChange
}: NumberSelectProps) => {

  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      SelectProps={{native: true}}
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