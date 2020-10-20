import * as React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import useUser from '../hooks/useUser';
import { getTables } from '../api/table'
import { Table, convertToTables } from '../model';

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

const convertTimeToHM = (start: Date, end: Date): string => {
  const allMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  const hours = Math.floor(allMinutes / 60);
  const minutes = Math.floor(allMinutes - 60 * hours);

  return `${hours}時間 ${minutes}分`
}

const Tables = () => {
  const { userStatus } = useUser();
  const [tables, setTables] = React.useState<Table[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp) {
        if (userStatus.user) {
          const token = await userStatus.user.getIdToken();
          let t = await getTables(token);
          t = convertToTables(t);
          setTables(t);
        }
      }
    }
    fetch();
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, [userStatus.user]);

  React.useEffect(() => {
    const subscription = setInterval(() => {
      setDate(new Date());
    }, 1000 * 60);
    return () => {
      clearInterval(subscription);
    }
  }, [])

  return (
    <List>
      {
        tables.map(table => (
          <ListItemLink key={table.id} href={`/table/${table.id}`}>
            <ListItemText primary={table.roomName} secondary={`${convertTimeToHM(table.startAt, date)}経過`} />
          </ListItemLink>
        ))
      }
    </List>
  )
}

export default Tables;
