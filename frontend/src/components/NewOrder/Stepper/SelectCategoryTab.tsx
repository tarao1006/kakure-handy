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
  activeCategory: number;
  setActiveCategory: (categoryId: number) => void;
  items: Item[];
  handleSet: (item: Item) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

const SelectCategoryTab: React.FC<SelectCategoryTabProps> = ({ activeCategory, setActiveCategory, items, handleSet, increment, decrement }) => {

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setActiveCategory(newValue);
  };

  return (
    <div>
      <Tabs value={activeCategory} onChange={handleChange}>
        <Tab label="ドリンク" />
        <Tab label="フード" />
      </Tabs>
      <TabPanel value={activeCategory} index={0}>
        <DrinkList
          items={items.filter(item => item.isDrink())}
          handleSet={handleSet}
          increment={increment}
          decrement={decrement}
        />
      </TabPanel>
      <TabPanel value={activeCategory} index={1}>
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
