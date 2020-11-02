import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from '@atoms';

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

export default useStyles;


interface LogInFormProps {
  email: string;
  password: string;
  checked: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent) => void;
  handleForgetPassword: () => void;
}

export const LogInForm: React.FC<LogInFormProps> = ({
  email,
  password,
  checked,
  setEmail,
  setPassword,
  setChecked,
  handleSubmit,
  handleForgetPassword
}): JSX.Element => {
  const classes = useStyles();

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

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        name="email"
        autoComplete="email"
        autoFocus
        type="email"
        value={email}
        onChange={handleEmail}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={handlePassword}
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

