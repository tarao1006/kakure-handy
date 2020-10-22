import * as React from 'react';
import {
  FormControl,
  FormLabel,
} from '@material-ui/core';
import useStyles from './base';
import { Item } from '../../../model';
import SelectCategoryTab from './SelectCategoryTab';

interface SelectItemProps {
  activeCategory: number;
  setActiveCategory: (categoryId: number) => void;
  items: Item[];
  handleSet: (item: Item) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ activeCategory, setActiveCategory, items, handleSet, increment, decrement }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">注文するメニューを選択してください。</FormLabel>
        <SelectCategoryTab
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          items={items}
          handleSet={handleSet}
          increment={increment}
          decrement={decrement}
        />
    </FormControl>
  )
}
