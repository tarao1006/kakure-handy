import React from 'react';
import { List } from '@atoms';
import { FolderListItem as ItemList } from '@molecules';
import { ItemListItem } from '@organisms';
import { useItems } from '@hooks';

export const CategoryList = ({
  categories
}: {categories: {id: number, category_type_id: number, name: string}[]}): JSX.Element => {
  const { items } = useItems();

  return (
    <List>
      {
        categories.map((category, index) => (
          <ItemList
            key={index}
            title={category.name}
            collapsedContent={
              <List component="div" disablePadding>
                {
                  items
                    .filter(item => item.category.id === category.id)
                    .map(item => <ItemListItem key={item.id} item={item} />)
                }
              </List>
            }
          />
        ))
      }
    </List>
  );
}
