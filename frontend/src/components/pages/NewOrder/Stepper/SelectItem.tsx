import * as React from 'react';
import {
  FormControl,
  FormLabel,
} from '@material-ui/core';
import useStyles from './base';
import SelectCategoryTab from './SelectCategoryTab';

interface SelectItemProps {
  activeCategory: number;
  setActiveCategory: (categoryId: number) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ activeCategory, setActiveCategory }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">注文するメニューを選択してください。</FormLabel>
        <SelectCategoryTab
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
    </FormControl>
  )
}
