import * as React from 'react';
import { FormControl, FormLabel } from '@material-ui/core';
import { Table, Item } from '../../../model';

interface ConfirmationProps {
  table: Table;
  items: Item[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ table, items, increment, decrement }) => {

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
        items.map(item => (
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
