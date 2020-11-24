import * as React from 'react';
import { useHistory } from 'react-router';
import { Container, List, ListItem, ListItemText } from '@atoms';
import { AuthContext } from '../../../contexts/auth';
import { getTables } from '../../../api/table'
import { Table as TableModel, convertToTables } from '../../../model';
import { convertTimeToHM } from '../../../utils';
import { Loading } from '@molecules';

const ListTableLink = ({table, handleClick}) => {
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
      <ListItemText primary={table.roomName} secondary={`${convertTimeToHM(table.startAt, date)}経過`} />
    </ListItem>
  )
}

export const Tables = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [tables, setTables] = React.useState<TableModel[]>([]);
  const history = useHistory();

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      if (!cleanedUp) {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const res = await getTables(token);
          const t = convertToTables(res);
          setTables(t);
        }
      }
    }
    fetch();
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, [currentUser]);

  React.useEffect(() => {
    if (tables.length !== 0) {
      setIsLoading(false);
    }
  });

  const handleClick = (id: number): void => {
    history.push(`/table/${id}`)
  };

  return (
    isLoading
    ? (<Loading />)
    : (
      <Container component="main" maxWidth="xs">
        <List>
          {
            tables.map(table => (
              <ListTableLink key={table.id} table={table} handleClick={handleClick} />
            ))
          }
        </List>
      </Container>
    )
  )
}
