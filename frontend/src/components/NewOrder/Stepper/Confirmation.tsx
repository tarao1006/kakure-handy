import * as React from 'react';
import { FormControl, FormLabel } from '@material-ui/core';
import { Table } from '../../../model';
import useItems from '../../../hooks/useItems';

interface ConfirmationProps {
  table: Table;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ table }) => {
  const { targetItems, increment, decrement } = useItems();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        注文を確定してください。
      </FormLabel>
      <div>
        テーブル
      </div>
      <div>
        {table.roomName}
      </div>
      <div>
        メニュー
      </div>
      {
        targetItems.map(item => (
          <div key={item.id}>
            <div>
              <div>
                {item.name}
              </div>
              <div>
                {item.count}
              </div>
            </div>
            <button onClick={() => increment(item.id)}>
              increment
            </button>
            <button onClick={() => decrement(item.id)}>
              decrement
            </button>
          </div>
        ))
      }
    </FormControl>
  )
}
