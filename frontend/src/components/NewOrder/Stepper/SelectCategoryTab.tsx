import * as React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { DrinkList, FoodList } from './CategoryList';
import { Item } from '../../../model'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
}

interface SelectCategoryTabProps {
  items: Item[];
  handleSet: (item: Item) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

const SelectCategoryTab: React.FC<SelectCategoryTabProps> = ({ items, handleSet, increment, decrement }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="ドリンク" />
        <Tab label="フード" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DrinkList
          items={items.filter(item => item.isDrink())}
          handleSet={handleSet}
          increment={increment}
          decrement={decrement}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FoodList
          items={items.filter(item => item.isFood())}
          handleSet={handleSet}
          increment={increment}
          decrement={decrement}
        />
      </TabPanel>
    </div>
  );
}

export default SelectCategoryTab;
