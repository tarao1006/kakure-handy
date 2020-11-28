import React from 'react';
import { List } from '@atoms';
import { InboxIcon } from '@icons';
import { FoldedList } from '@organisms';
import { useItems } from '@hooks';

export const CategoryList = ({
  categories
}: {categories: {id: number, category_type_id: number, name: string}[]}): JSX.Element => {
  const { items } = useItems();

  return (
    <List>
      {
        categories.map((category, index) => (
          <FoldedList
            Icon={InboxIcon}
            key={index}
            category={category}
            items={items.filter(item => item.category.id === category.id)}
          />
        ))
      }
    </List>
  );
}
