import React from 'react';
import { NewOrder } from '@organisms';

interface NewOrderTemplateProps {
  handleOrder: () => Promise<void>;
}

export const NewOrderTemplate = ({handleOrder}: NewOrderTemplateProps): JSX.Element => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [activeCategory, setActiveCategory] = React.useState<number>(0);

  return (
    <NewOrder
      handleOrder={handleOrder}
      activeStep={activeStep}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      setActiveStep={setActiveStep}
    />
  )
}
