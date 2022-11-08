import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext, useMemo } from 'react';
import { Controller, FormContextValues } from 'react-hook-form';
import FormgenContext from './FormgenContext';
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
  const { adapterLocale } = useContext(FormgenContext);
  const sortedElements = useMemo(() => elements.sort((a, b) => a.order - b.order), [elements]);

  if (!elements.length) {
    return null;
  }

  return (
    <div className={className}>
      <LocalizationProvider
        adapterLocale={adapterLocale}
        dateAdapter={dateUtils || AdapterDayjs}
      >
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
