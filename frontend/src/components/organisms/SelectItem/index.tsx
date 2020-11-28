import * as React from 'react';
import {
  FormControl
} from '@atoms';
import { NewOrderFormLabel, NewOrderFormControl } from '@molecules';
import { SelectCategory } from '@organisms';

interface SelectItemProps {
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectItem = ({
  activeCategory,
  setActiveCategory
}: SelectItemProps): JSX.Element => {

  return (
    <NewOrderFormControl>
      <NewOrderFormLabel>注文するメニューを選択してください。</NewOrderFormLabel>
      <SelectCategory
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </NewOrderFormControl>
  )
}
