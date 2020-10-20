import * as React from 'react';
import {
  Tab,
  Tabs,
} from '@material-ui/core';

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
  food?: JSX.Element;
  drink?: JSX.Element;
}

const SelectCategoryTab: React.FC<SelectCategoryTabProps> = ({ food, drink }) => {
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
        {drink}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {food}
      </TabPanel>
    </div>
  );
}

export default SelectCategoryTab;
