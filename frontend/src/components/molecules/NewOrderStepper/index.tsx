import React from 'react';
import { Step, Stepper, StepLabel } from '@atoms';

interface NewOrderStepperProps {
  step: number;
}

export const NewOrderStepper = ({step}: NewOrderStepperProps): JSX.Element => {

  return (
    <Stepper activeStep={step} style={{ background: 'transparent' }}>
      <Step><StepLabel>テーブル</StepLabel></Step>
      <Step><StepLabel>注文</StepLabel></Step>
      <Step><StepLabel>確定</StepLabel></Step>
    </Stepper>
  )
}
