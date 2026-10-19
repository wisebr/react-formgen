import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import FormgenContext from './FormgenContext';
import ElementSwitch from './ElementSwitch';
import { ElementTipsWrapper, ElementTipsWrapperProps } from './ElementTipsWrapper';
import { ElementData } from './types';

export interface FormRendererProps<Ctx = any> {
  className?: string;
  control: Control;
  elements: ElementData[];
  dateUtils?: any;
  context?: Ctx;
  showTips?: boolean;
  elementTipsWrapperProps?: ElementTipsWrapperProps;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  className, elements, control, dateUtils, context, showTips,
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
                name={el.name}
                control={control}
                rules={{required: el.required}}
                defaultValue={el.value}
                render={({field, fieldState}) => (
                  <ElementSwitch
                    scene="renderer"
                    {...el}
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    inputRef={field.ref}
                    error={fieldState.error}
                    context={context}
                  />
                )}
              />
            </ElementTipsWrapper>
          );
        }) : sortedElements.map((el) => (
          <Controller
            key={el.id}
            name={el.name}
            control={control}
            rules={{required: el.required}}
            defaultValue={el.value}
            render={({field, fieldState}) => (
              <ElementSwitch
                scene="renderer"
                {...el}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                inputRef={field.ref}
                error={fieldState.error}
                context={context}
              />
            )}
          />
        ))}
      </LocalizationProvider>
    </div>
  );
};

export default React.memo(FormRenderer);
