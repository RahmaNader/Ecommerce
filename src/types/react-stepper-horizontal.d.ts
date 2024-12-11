// src/types/react-stepper-horizontal.d.ts

declare module 'react-stepper-horizontal' {
    import * as React from 'react';
  
    export interface Step {
      title?: string;
      subtitle?: string;
      href?: string;
      onClick?: () => void;
    }
  
    export interface StepperProps {
      steps: Step[];
      activeStep?: number;
      activeColor?: string;
      completeColor?: string;
      defaultColor?: string;
      activeTitleColor?: string;
      completeTitleColor?: string;
      defaultTitleColor?: string;
      circleFontColor?: string;
      titleFontSize?: number;
      circleFontSize?: number;
      size?: number;
      circleTop?: number;
      titleTop?: number;
      defaultBarColor?: string;
      completeBarColor?: string;
      barStyle?: 'solid' | 'dotted';
      lineMarginOffset?: number;
    }
  
    const Stepper: React.FC<StepperProps>;
    export default Stepper;
  }
  