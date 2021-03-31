import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import React, { useMemo } from 'react';
import { Controller, FormContextValues } from 'react-hook-form';

import ElementSwitch from './ElementSwitch';
import { ElementTipsWrapper, ElementTipsWrapperProps } from './ElementTipsWrapper';
import { ElementData } from './types';

export interface FormRendererProps<Ctx = any> extends FormContextValues {
  className?: string;
  elements: ElementData[];
  dateUtils?: any;
  context?: Ctx;
  showTips?: boolean;
  elementTipsWrapperProps?: ElementTipsWrapperProps;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  className, elements, control, dateUtils, errors, context, showTips,
  elementTipsWrapperProps
}) => {
  const sortedElements = useMemo(() => elements.sort((a, b) => a.order - b.order), [elements]);

  if (!elements.length) {
    return null;
  }

  return (
    <div className={className}>
      <LocalizationProvider dateAdapter={dateUtils || AdapterDateFns}>
        {showTips ? sortedElements.map((el) => {
          return (
            <ElementTipsWrapper
              key={el.id}
              name={el.name}
              helpTip={el.helpTip}
              {...elementTipsWrapperProps}
            >
              <Controller
                control={control}
                as={ElementSwitch}
                scene="renderer"
                {...el}
                error={errors[el.name]}
                rules={{required: el.required}}
                defaultValue={el.value}
                context={context}
              />
            </ElementTipsWrapper>
          );
        }) : sortedElements.map((el) => (
          <Controller
            key={el.id}
            control={control}
            as={ElementSwitch}
            scene="renderer"
            {...el}
            error={errors[el.name]}
            rules={{required: el.required}}
            defaultValue={el.value}
            context={context}
          />
        ))}
      </LocalizationProvider>
    </div>
  );
};

export default React.memo(FormRenderer);
