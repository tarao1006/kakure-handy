import React, { useState } from 'react';
import { List } from '@atoms';
import { CategoryListItem } from '@molecules';
import { ItemListItem } from '@organisms';
import { useItems } from '@hooks';

export const CategoryList = ({
  categories
}: {categories: {id: number, category_type_id: number, name: string}[]}): JSX.Element => {
  const { items } = useItems();
  const [opens, setOpens] = useState<boolean[]>(Array.from({length: categories.length}, (k, v) => false));

  const handleClick = (index: number) => {
    let newOpens = Array.from({length: categories.length}, (k, v) => false);
    if (!opens[index]) {
      newOpens[index] = true;
    }
    setOpens(newOpens);
  }

  return (
    <List>
      {
        categories.map((category, index) => (
          <CategoryListItem
            key={index}
            title={category.name}
            index={index}
            open={opens[index]}
            onClick={handleClick}
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
