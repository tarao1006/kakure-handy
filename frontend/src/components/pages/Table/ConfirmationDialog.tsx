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
  onClose: (ok: boolean) => void;
  topic: string;
  subTopic?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({open, onClose, topic, subTopic}) => {
  const handleCancel = () => onClose(false);
  const handleExecute = () => onClose(true);

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
