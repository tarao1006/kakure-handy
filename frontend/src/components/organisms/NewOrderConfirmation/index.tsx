import React from 'react';
import { List, Typography } from '@atoms';
import { NewOrderFormControl, NewOrderFormLabel } from '@molecules';
import { ItemListItem } from '@organisms';
import { useItems, useTables} from '@hooks';

export const NewOrderConfirmation = (): JSX.Element => {
  const { targetItems } = useItems();
  const { targetTable } = useTables();

  return (
    <NewOrderFormControl>
      <NewOrderFormLabel>注文を確定してください。</NewOrderFormLabel>
      <div>テーブル</div>
      <Typography component='h1' variant='h5' style={{textAlign: 'center'}}>
        {targetTable.room.name}
      </Typography>
      <div>メニュー</div>
      <List>
        {targetItems.map(item => <ItemListItem key={item.id} item={item} />)}
      </List>
    </NewOrderFormControl>
  )
}
