import * as React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { DrinkList, FoodList } from '@organisms';

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

export const SelectCategoryTab: React.FC<SelectCategoryTabProps> = ({ activeCategory, setActiveCategory }) => {

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setActiveCategory(newValue);
  };

  return (
    <div>
      <Tabs value={activeCategory} onChange={handleChange} indicatorColor="primary" textColor="primary">
        <Tab label="ドリンク" />
        <Tab label="フード" />
      </Tabs>
      <TabPanel value={activeCategory} index={0}>
        <DrinkList />
      </TabPanel>
      <TabPanel value={activeCategory} index={1}>
        <FoodList />
      </TabPanel>
    </div>
  );
}
