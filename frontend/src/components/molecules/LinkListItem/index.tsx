import * as React from 'react';
import { ListItem, ListItemText } from '@atoms';
import { Table, ORDER_STATUS_ORDERED } from '@model';
import { convertTimeToHM } from '@utils';

interface LinkListItemProps {
  table: Table;
  handleClick: (id: number) => void;
}

export const LinkListItem = ({ table, handleClick }: LinkListItemProps): JSX.Element => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const subscription = setInterval(() => {
      setDate(new Date());
    }, 1000 * 60);
    return () => {
      clearInterval(subscription);
    }
  }, []);

  const handleLink = () => {
    handleClick(table.id);
  }

  return (
    <ListItem button component="a" onClick={handleLink}>
      <ListItemText
        primary={table.room.name}
        secondary={`${convertTimeToHM(table.startAt, date)}経過 未提供: ${table.orders.filter(order => order.status.id === ORDER_STATUS_ORDERED).length} 件`}
      />
    </ListItem>
  )
}