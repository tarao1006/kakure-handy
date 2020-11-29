import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '@contexts';
import { Button } from '@atoms';
import { createTable } from '@api';
import { NewTableSelect } from '@molecules';
import { Room } from '@model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

interface NewTableTemplateProps {
  availableRooms: Room[];
}

export const NewTableTemplate = ({availableRooms}: NewTableTemplateProps): JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [targetRoom, setTargetRoom] = useState<Room>(availableRooms[0]);
  const [count, setCount] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await currentUser.getIdToken();
    await createTable(token, targetRoom.id, count);
    history.push('/new-table-success');
  }

  const handleTableIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTargetRoom(availableRooms.find(room => room.id === parseInt(event.target.value as string)));
  }

  const handleCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCount(parseInt(event.target.value as string));
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <NewTableSelect
        id={targetRoom.id}
        handleChange={handleTableIdChange}
        label="部屋"
        options={
          availableRooms.map((room, idx) => (
            <option key={idx + 1} value={room.id}>{room.name}</option>
          ))
        }
      />
      <NewTableSelect
        id={count}
        handleChange={handleCountChange}
        label="人数"
        options={
          (Array.from({length: targetRoom.capacity}, (k, v) => v + 1)).map((value, idx) => (
            <option key={idx + 1} value={`${value}`}>{value}</option>
          ))
        }
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        作成
      </Button>
    </form>
  )
}
