import * as React from 'react';
import { Tab, Tabs } from '@atoms';
import { TabPanel } from '@molecules';
import { DrinkList, FoodList } from '@organisms';

interface SelectCategoryProps {
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectCategory = ({
  activeCategory,
  setActiveCategory
}: SelectCategoryProps): JSX.Element => {

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveCategory(newValue);
  };

  return (
    <>
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
    </>
  );
}
