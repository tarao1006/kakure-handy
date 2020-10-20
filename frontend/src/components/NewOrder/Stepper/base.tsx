import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingLeft: theme.spacing(1),
    },
    tabRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    content: {
      width: '100%',
      // paddingLeft: theme.spacing(2),
    },
    scrollArea: {
      width: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
    },
  }),
);

export default useStyles;
