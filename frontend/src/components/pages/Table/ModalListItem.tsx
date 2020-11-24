import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CloseIcon,
} from '@atoms';
import { OrderDetail } from '../../../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(2),
      color: theme.palette.grey[500],
      padding: 0,
    },
    topic: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    topicValue: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      textAlign: 'center',
    },
    dialogButtons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  })
);

interface ModalListItemProps {
  disabled: boolean;
  detail: OrderDetail;
  handleServed: (id: number) => Promise<any>;
  handleCancel: (id: number) => Promise<any>;
  handleOrdered: (id: number) => Promise<any>;
}

export const ModalListItem: React.FC<ModalListItemProps> = ({disabled, detail, handleServed, handleCancel, handleOrdered}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const icons = {
    "ordered": <RadioButtonUncheckedIcon />,
    "served": <CheckIcon color="primary" />,
    "cancelled": <ClearIcon color="error" />,
  }

  const disables = {
    "ordered": detail.status === "served" || detail.status === "ordered",
    "served": detail.status === "served" || detail.status === "cancelled",
    "cancelled": detail.status === "served" || detail.status === "cancelled"
  }

  const topics = {
    "名前": detail.itemName,
    "注文時刻": detail.createdAt.toLocaleTimeString(),
    "個数": detail.quantity,
    "状態": detail.status,
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const ServedButton = () => {
    const handleClick = async () => {
      await handleServed(detail.id);
    }

    return (
      <Button disabled={disabled || disables["served"]} color="primary" onClick={handleClick}>
        提供済みにする
      </Button>
    )
  }

  const CancelButton = () => {
    const handleClick = async () => {
      await handleCancel(detail.id);
    }

    return (
      <Button disabled={disabled || disables["cancelled"]} color="primary" onClick={handleClick}>
        キャンセルする
      </Button>
    )
  }

  const OrderedButton = () => {
    const handleClick = async () => {
      await handleOrdered(detail.id);
    }

    return (
      <Button disabled={disabled || disables["ordered"]} color="primary" onClick={handleClick}>
        注文済みに戻す
      </Button>
    )
  }

  return (
    <>
      <ListItem button component="a" onClick={handleOpen}>
        <ListItemIcon>
          {icons[detail.status]}
        </ListItemIcon>
        <ListItemText
          primary={detail.itemName}
          secondary={`${detail.createdAt.toLocaleTimeString()} ${detail.quantity}個`}
          primaryTypographyProps={{ variant: "body2" }}
        />
      </ListItem>
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography>
            注文編集
          </Typography>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {
            Object.entries(topics).map(topic => (
              <div key={topic[0]}>
                <Typography variant="body1">
                  {topic[0]}
                </Typography>
                <Typography variant="body1" className={classes.topicValue}>
                  {topic[1]}
                </Typography>
              </div>
            ))
          }
        </DialogContent>
        <DialogActions className={classes.dialogButtons} disableSpacing={true}>
          <ServedButton />
          <CancelButton />
          <OrderedButton />
        </DialogActions>
      </Dialog>
    </>
  )
}
