import * as React from 'react';
import { NewOrderFormLabel, SelectTableList, NewOrderFormControl } from '@molecules';
import { useTables } from '@hooks';

interface SelectTableProps {}

export const SelectTable = ({}: SelectTableProps): JSX.Element => {
  const { tables, targetTable, updateTable } = useTables();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTable(tables.find(table => table.id === Number.parseInt(event.target.value)));
  };

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
