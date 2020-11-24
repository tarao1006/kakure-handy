import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../../contexts/auth';
import {
  Button,
  Container,
  TextField
} from '@atoms';
import { createTable } from '@api';

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

export const NewTable = (): JSX.Element => {
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
    <Container component="main" maxWidth='xs'>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          select
          value={tableId}
          color="primary"
          onChange={handleTableIdChange}
          label="部屋"
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>1, 2</option>
          <option value={8}>2, 3</option>
          <option value={9}>1, 2, 3</option>
          <option value={10}>か</option>
          <option value={11}>く</option>
          <option value={12}>れ</option>
          <option value={13}>か, く</option>
          <option value={14}>く, れ</option>
          <option value={15}>か, く, れ</option>
          <option value={16}>カウンター</option>
        </TextField>

        <TextField
          fullWidth
          select
          value={count}
          color="primary"
          onChange={handleCountChange}
          label="人数"
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </TextField>
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
    </Container>
  )
}
