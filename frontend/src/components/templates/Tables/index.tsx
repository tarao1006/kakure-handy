import * as React from 'react';
import { useHistory } from 'react-router';
import { List } from '@atoms';
import { LinkListItem } from '@molecules'
import { Table } from '@model';

interface TablesTemplateProps {
  tables: Table[];
}

export const TablesTemplate = ({ tables }: TablesTemplateProps): JSX.Element => {
  const history = useHistory();

  const handleClick = (id: number): void => {
    history.push(`/table/${id}`);
  };

  return (
    <List>
      {
        tables.map(table => (
          <LinkListItem key={table.id} table={table} handleClick={handleClick} />
        ))
      }
    </List>
  )
}
