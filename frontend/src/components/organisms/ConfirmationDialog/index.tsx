import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@atoms';

interface ConfirmationDialogProps {
  open: boolean;
  onCancel: () => void,
  onExecute: () => void,
  topic: string;
  subTopic?: string;
}

export const ConfirmationDialog = ({
  open,
  onCancel,
  onExecute,
  topic,
  subTopic
}: ConfirmationDialogProps): JSX.Element => {

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={onCancel}
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
        <Button onClick={onCancel} color="primary">
          キャンセル
        </Button>
        <Button onClick={onExecute} color="primary">
          実行
        </Button>
      </DialogActions>
    </Dialog>
  )
}
