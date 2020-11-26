import React from 'react';
import { Button } from '@atoms';

interface OrderDialogOperationButtonProps {
  operation: string;
  disabled: boolean;
  id: number;
  onClick: (id: number) => Promise<void>;
}

export const OrderDialogOperationButton = ({
  operation,
  disabled,
  id,
  onClick
}: OrderDialogOperationButtonProps): JSX.Element => {

  const handleClick = () => {
    onClick(id);
  }

  return (
    <Button disabled={disabled} color="primary" onClick={handleClick}>
      {operation}
    </Button>
  )
}
