import * as React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { DrinkList, FoodList } from './CategoryList';
import useItems from '../../../hooks/useItems';

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
}

const SelectCategoryTab: React.FC<SelectCategoryTabProps> = ({ activeCategory, setActiveCategory }) => {
  const { items } = useItems();

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
        />
      </TabPanel>
      <TabPanel value={activeCategory} index={1}>
        <FoodList
          items={items.filter(item => item.isFood())}
        />
      </TabPanel>
    </div>
  );
}

export default SelectCategoryTab;
