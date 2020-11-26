import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '@contexts';
import { Button } from '@atoms';
import { createTable } from '@api';
import { NewTableSelect } from '@molecules';

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

const rooms = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1, 2",
  "2, 3",
  "1, 2, 3",
  "か",
  "く",
  "れ",
  "か, く",
  "く, れ",
  "か, く, れ",
  "カウンター"
]

const capacities = {
  1: 5,
  2: 5,
  3: 5,
  4: 2,
  5: 2,
  6: 3,
  7: 10,
  8: 10,
  9: 20,
  10: 5,
  11: 5,
  12: 5,
  13: 10,
  14: 10,
  15: 20,
  16: 5
}

export const NewTableTemplate = (): JSX.Element => {
  const { currentUser } = React.useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [tableId, setTableId] = React.useState<number>(1);
  const [count, setCount] = React.useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await currentUser.getIdToken();
    await createTable(token, tableId);
    history.push('/tables');
  }

  const handleTableIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTableId(parseInt(event.target.value as string));
  }

  const handleCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCount(parseInt(event.target.value as string));
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <NewTableSelect
        id={tableId}
        handleChange={handleTableIdChange}
        label="部屋"
        values={rooms}
      />
      <NewTableSelect
        id={count}
        handleChange={handleCountChange}
        label="人数"
        values={Array.from({length: capacities[tableId]}, (v, k) => `${k + 1}`)}
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
