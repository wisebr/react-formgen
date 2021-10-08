import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import shortId from 'shortid';

import { BASE_LIBRARY_TYPE } from './constants';
import ElementSwitch from './ElementSwitch';
import ElementWrapper from './ElementWrapper';
import FormgenContext from './FormgenContext';
import { InjectFormgenTheme } from './theme';
import { ElementData, ElementOptions, LibraryDragItem } from './types';
import { isSelectElement } from './utils';

export interface PreviewerProps<Ctx = any> {
  className?: string;
  acceptDropType?: string;
  onPreDrop?: (item: LibraryDragItem) => boolean;
  onDrop?: (item: LibraryDragItem) => void;

  elements: ElementData[];
  onAddElement?: (element: ElementData) => void;
  onRemoveElement?: (id: string) => void;
  onActiveElement?: (id: string) => void;
  onMoveElement?: (index: number, target: number) => void;
  activedElement?: ElementData;

  dateUtils?: any; // Date utils like DateFnsUtils from @date-io/date-fns
  context?: Ctx;
}

const useStyles = makeStyles<InjectFormgenTheme>(({formgen}) => ({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    height: '100%',
  },
  dragging: {
    backgroundColor: formgen.palette.background.active,
  },
  draggingOver: {
    backgroundColor: formgen.palette.background.dragover,
  },
}), {name: 'fg-Previewer'});

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
    label: '',
    meta: {},
    ...options,
  };
  if (isSelectElement(element)) {
    element.props.options.push({id: shortId(), label: '', value: ''});
  }
  return element;
};

const Previewer: React.FC<PreviewerProps> = ({
  className,
  acceptDropType = BASE_LIBRARY_TYPE,
  onAddElement,
  onRemoveElement,
  onActiveElement,
  onMoveElement,
  onPreDrop,
  onDrop,
  activedElement,
  elements,
  dateUtils,
  context,
}) => {
  const { getLocale } = useContext(FormgenContext);

  const [{isOver, canDrop}, drop] = useDrop({
    accept: acceptDropType,
    drop: (item: LibraryDragItem) => {
      if (onPreDrop && !onPreDrop(item)) {
        return;
      }
      (function addElement (element: ElementOptions) {
        if (element.elements) {
          element.elements.forEach((el) => {
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
      if (onDrop) {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const classes = useStyles();

  const createElementClickHandler = (id: string) => () => {
    if (onActiveElement) {
      onActiveElement(id);
    }
  };

  return (
    <div
      className={classNames(classes.root, className, {
        [classes.dragging]: canDrop,
        [classes.draggingOver]: isOver,
      })}
      ref={drop}
    >
      <LocalizationProvider dateAdapter={dateUtils || AdapterDateFns}>
        {elements.map((el, i) => (
          <ElementWrapper
            key={el.id}
            id={el.id}
            index={i}
            actived={!!activedElement && activedElement.id === el.id}
            onClick={createElementClickHandler(el.id)}
            onRemoveElement={onRemoveElement}
            onMoveElement={onMoveElement}
            acceptDropType={`${acceptDropType}-elementWrapper`}
          >
            <ElementSwitch {...el} scene="previewer" context={context} />
          </ElementWrapper>
        ))}
      </LocalizationProvider>
    </div>
  );
};

export default React.memo(Previewer);
