import * as React from 'react';
import { NewOrderFormLabel, SelectTableList, NewOrderFormControl } from '@molecules';
import useTables from '../../../hooks/useTables';

interface SelectTableProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectTable = ({
  handleChange
}: SelectTableProps): JSX.Element => {
  const { tables, targetTable } = useTables();

  return (
    <NewOrderFormControl>
      <NewOrderFormLabel>部屋を選択してください。</NewOrderFormLabel>
      <SelectTableList
        tables={tables}
        value={targetTable}
        handleChange={handleChange}
      />
    </NewOrderFormControl>
  )
}
