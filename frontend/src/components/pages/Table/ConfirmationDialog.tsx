import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Button,
  CloseIcon,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Table,
  TableBody,
  TableRow,
  TableCell,
  ExpandLess,
  ExpandMore,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@atoms';
import { Loading } from '@molecules';
import { AuthContext } from '../../../contexts/auth';
import { getTable, exitTable, createBill, deleteBill, updateOrder } from '@api';
import { Table as TableModel, convertToTable, OrderDetail } from '../../../model';
import { convertTimeToHM } from '../../../utils';
import { ModalListItem } from './ModalListItem';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (ok: boolean) => void;
  topic: string;
  subTopic?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({open, onClose, topic, subTopic}) => {
  const handleCancel = () => {
    onClose(false);
  }

  const handleExecute = () => {
    onClose(true);
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>
        {topic} を実行しますか？
      </DialogTitle>
      {
        subTopic && (
          <DialogContent>
            {subTopic}
          </DialogContent>
        )
      }
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleExecute} color="primary">
          実行
        </Button>
      </DialogActions>
    </Dialog>
  )
}
