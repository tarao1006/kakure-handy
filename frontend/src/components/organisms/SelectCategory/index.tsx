import * as React from 'react';
import { Tab, Tabs } from '@atoms';
import { TabPanel } from '@molecules';
import { CategoryList } from '@organisms';
import { DRINK_CATEGORY_ID, FOOD_CATEGORY_ID} from '@model';
import category from '@dataset/item_category.json';

const foodCategory = category.filter(value => value.category_type_id === FOOD_CATEGORY_ID);
const drinkCategory = category.filter(value => value.category_type_id === DRINK_CATEGORY_ID);

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
        <CategoryList categories={drinkCategory} />
      </TabPanel>
      <TabPanel value={activeCategory} index={1}>
        <CategoryList categories={foodCategory} />
      </TabPanel>
    </>
  );
}
