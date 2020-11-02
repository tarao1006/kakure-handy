import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@atoms';
import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../../../modules/auth';

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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const defaultEmail = "user01@example.com";
const defaultPassword = "password"

interface LogInFromProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogInForm: React.FC<LogInFromProps> = ({ setIsLoading }): JSX.Element => {
  const classes = useStyles();
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState(defaultPassword);
  const [checked, setChecked] = React.useState(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const query = useQuery();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setIsError(true);
      return
    }
    setIsLoading(true);
    await login(email, password, checked);
    history.push(query.get('redirect_to') ?? '/');
  }

  const handleEmail = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(e.target.value)
  }

  const handlePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value)
  }

  const handleChecked = (
    _: React.ChangeEvent<HTMLInputElement>,
    newChecked: boolean
  ): void => {
    setChecked(newChecked);
  }

  const handleForgetPassword = (): void => {
    history.push('/forget-password');
  }

  const isValidEmail = (email: string): boolean => {
    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    return reg.test(email);
  }

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        id="email"
        value={email}
        onChange={handleEmail}
        type="email"
        label="メールアドレス"
        helperText={isError ? "正しいメールアドレスを入力してください" : ""}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        autoFocus
      />
      <TextField
        id="password"
        value={password}
        onChange={handlePassword}
        type="password"
        label="パスワード"
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
      <FormControlLabel
        control={<Checkbox checked={checked} color="primary" onChange={handleChecked} />}
        label="パスワードを保存する"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        ログイン
      </Button>
      <Grid container>
        <Grid item xs>
          <Link variant="body2" onClick={handleForgetPassword}>
            パスワードを忘れた場合
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}

