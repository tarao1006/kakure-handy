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
  values?: Item[];
  onChange: (item: Item) => void;
}

const SelectCategoryTab: React.FC<SelectCategoryTabProps> = ({ items, values, onChange }) => {
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
          items={items.filter(item => { item.isDrink() })}
          values={values}
          handleChange={onChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FoodList
          items={items.filter(item => { item.isFood() })}
          values={values}
          handleChange={onChange}
        />
      </TabPanel>
    </div>
  );
}

export default SelectCategoryTab;
