import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import shortId from 'shortid';

import { BASE_LIBRARY_TYPE } from './constants';
import ElementSwitch from './ElementSwitch';
import ElementWrapper from './ElementWrapper';
import FormgenContext from './FormgenContext';
import { ElementData, ElementOptions, LibraryDragItem } from './types';
import { isDateTimePickerElement, isSelectElement } from './utils';

export interface PreviewerProps {
  className?: string;
  acceptDropType?: string;
  onPreDrop?: (item: LibraryDragItem) => boolean;
  onDrop?: (item: LibraryDragItem) => void;

  elements: ElementData[];
  onAddElement?: (element: ElementData) => void;
  onRemoveElement?: (id: string) => void;
  onActiveElement?: (id: string) => void;
  activedElement?: ElementData;

  dateUtils: any; // Date utils like DateFnsUtils from @date-io/date-fns
}

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    height: '100%',
  },
});

const generateDefElement = (options: ElementOptions): ElementData => {
  const element = {
    id: '',
    order: 0,
    name: '',
    value: '',
    required: false,
    disabled: false,
    helpTip: '',
    props: {},
    settings: {},
    label:'',
    ...options,
  };
  if (isSelectElement(element)) {
    element.props.options.push({id: shortId(), label: '', value: ''});
  }
  if (isDateTimePickerElement(element)) {
    element.value = new Date().toISOString();
  }
  return element;
};

const Previewer: React.FC<PreviewerProps> = ({
  className,
  acceptDropType = BASE_LIBRARY_TYPE,
  onAddElement,
  onRemoveElement,
  onActiveElement,
  onPreDrop,
  onDrop,
  activedElement,
  elements,
  dateUtils,
}) => {
  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);

  const [, drop] = useDrop<LibraryDragItem, void, {}>({
    accept: acceptDropType,
    drop: (item: LibraryDragItem) => {
      if (onPreDrop && !onPreDrop(item)) {
        return;
      }
      (function addElement(element: ElementOptions) {
        if (element.elements) {
          element.elements.forEach(el => {
            addElement(el);
          });
        } else {
          if (!element.type) {
            console.error(`can't get element type from dropping object, will ignore adding it %o`, element);
            return;
          }
          const payload = generateDefElement(element);
          payload.label = getLocale(`lib.element.${element.type}`);
          if (onAddElement) {
            onAddElement(payload);
          }
        }
      })(item.element);
      console.log('dropped item:', item);
      if (onDrop) {
        onDrop(item);
      }
    },
  });

  const createElementClickHandler = (id: string) => () => {
    if (onActiveElement) {
      onActiveElement(id);
    }
  };

  return (
    <div className={classNames(classes.root, className)} ref={drop}>
      <MuiPickersUtilsProvider utils={dateUtils}>
        {elements.map((el: ElementData) => (
          <ElementWrapper
            key={el.id}
            id={el.id}
            actived={!!activedElement && activedElement.id === el.id}
            onClick={createElementClickHandler(el.id)}
            onRemoveElement={onRemoveElement}
          >
            <ElementSwitch {...el} variant="previewer" />
          </ElementWrapper>
        ))}
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default React.memo(Previewer);
