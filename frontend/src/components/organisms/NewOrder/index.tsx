import * as React from 'react';
import useItems from '../../../hooks/useItems';
import useTables from '../../../hooks/useTables';
import { NewOrderStepper } from '@molecules';
import { NewOrderConfirmation, SelectTable, SelectItem, NewOrderOperationButtons } from '@organisms';

interface NewOrderProps {
  handleOrder: () => void;
  activeCategory: number;
  activeStep: number;
  setActiveCategory: (categoryId: number) => void;
  setActiveStep: (step: any) => void;
}

export const NewOrder = ({
  handleOrder,
  activeCategory,
  activeStep,
  setActiveCategory,
  setActiveStep,
}: NewOrderProps): JSX.Element => {
  const { targetItems } = useItems();
  const { targetTable } = useTables();

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SelectTable />
      case 1:
        return <SelectItem activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      case 2:
        return <NewOrderConfirmation />
      default:
        return <></>
    }
  };

  const getDisabled = (step: number): boolean => {
    switch (step) {
      case 0:
        return targetTable === undefined
      case 1:
        return targetItems.length === 0
      case 2:
        return false
      default:
        return false
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <NewOrderStepper step={activeStep} />
      {getStepContent(activeStep)}
      <NewOrderOperationButtons
        activeStep={activeStep}
        getDisabled={getDisabled}
        handleBack={handleBack}
        handleNext={handleNext}
        handleOrder={handleOrder}
      />
    </>
  );
}
