import React, { useState } from 'react';
import { List } from '@atoms';
import { FolderListItem } from '@molecules';
import { FoldedListItem } from '@organisms';
import { Item } from '@model';

interface FoldedListProps {
  category: { id: number, name: string };
  items: Item[];
}

export const FoldedList = ({ category, items }: FoldedListProps): JSX.Element => {

  return (
    <FolderListItem
      title={category.name}
      collapsedContent={
        <List component="div" disablePadding>
          {
            items.map(item => <FoldedListItem key={item.id} item={item} />)
          }
        </List>
      }
    />
  )
}
