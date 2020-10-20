import * as React from 'react';
import {
  FormControl,
  FormLabel,
} from '@material-ui/core';
import useStyles from './base';
import { Item } from '../../../model';
import SelectCategoryTab from './SelectCategoryTab';
import { DrinkList, FoodList } from './CategoryList';

interface SelectItemProps {
  items: Item[],
  handleSet: (items: {id: number, name: string, count: number}[]) => void
  defaultCheckedList?: {id: number, name: string, count: number}[]
}

export const SelectItem: React.FC<SelectItemProps> = ({ items, handleSet, defaultCheckedList = [] }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState<{id: number, name: string, count: number}[]>([]);

  React.useEffect(() => {
    setValues(defaultCheckedList);
  }, [defaultCheckedList])

  const handleChange = (id: number, name: string, count: number) => {
    const exist = values.find(value => value.id === id);

    if (!exist && count !== 0) {
      const newValues = [...values, {id: id, name: name, count: count}]

      setValues(newValues);
      handleSet(newValues);
      return;
    }

    if (exist && count === 0) {
      let newValues = values.filter(value => value.id !== id);

      setValues(newValues);
      handleSet(newValues);
      return;
    }

    if (exist && count !== 0) {
      let newValues = [...values];
      newValues.forEach(value => {
        if (value.id === id) {
          value.count = count;
        }
        return value;
      });

      setValues(newValues);
      handleSet(newValues);
      return;
    }

    return;
  }

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">注文するメニューを選択してください。</FormLabel>
        <SelectCategoryTab
          drink={<DrinkList
            items={items}
            values={values}
            handleChange={handleChange}
          />}
          food={<FoodList
            items={items}
            values={values}
            handleChange={handleChange}
          />}
        />
    </FormControl>
  )
}
