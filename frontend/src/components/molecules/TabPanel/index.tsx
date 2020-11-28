import React from 'react';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel= ({
  children,
  value,
  index
}: TabPanelProps): JSX.Element => {

  return (
    <div hidden={value !== index}>
      {value === index && children}
    </div>
  );
}
