import * as React from 'react';
import {
  FormControl,
  FormLabel,
} from '@material-ui/core';
import useStyles from './base';
import { Item } from '../../../model';
import SelectCategoryTab from './SelectCategoryTab';

interface SelectItemProps {
  items: Item[];
  handleSet: (item: Item) => void;
  targetItems?: Item[] | undefined;
}

export const SelectItem: React.FC<SelectItemProps> = ({ items, handleSet, targetItems }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState<Item[] | undefined>(targetItems);

  React.useEffect(() => {
    setValues(targetItems);
  }, [targetItems]);

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">注文するメニューを選択してください。</FormLabel>
        <SelectCategoryTab
          items={items}
          values={values}
          onChange={handleSet}
        />
    </FormControl>
  )
}
