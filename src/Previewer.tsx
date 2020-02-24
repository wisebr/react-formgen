import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { BASE_LIBRARY_TYPE } from './constants';
import ElementSwitch from './ElementSwitch';
import ElementWrapper from './ElementWrapper';
import FormgenContext from './FormgenContext';
import { ElementData, ElementOptions, LibraryDragItem } from './types';

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
}

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    height: '100%',
  },
});

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
}) => {
  const classes = useStyles();
  const { getLocale } = useContext(FormgenContext);

  const [collectedProps, drop] = useDrop<LibraryDragItem, void, {}>({
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
          const payload: ElementData = {
            id: '',
            order: 0,
            name: '',
            required: false,
            hidden: false,
            meta: {},
            props: {},
            settings: {},
            ...element,
            locales: {
              ...element.locales,
              title: getLocale(`lib.${element.type}`),
            },
          };
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

  console.log('render previewer, collectedProps:', collectedProps);
  return (
    <div className={classNames(classes.root, className)} ref={drop}>
      {elements.map(el => (
        <ElementWrapper
          key={el.id}
          id={el.id}
          actived={!!activedElement && activedElement.id === el.id}
          onClick={createElementClickHandler(el.id)}
          onRemoveElement={onRemoveElement}
        >
          <ElementSwitch data={el} />
        </ElementWrapper>
      ))}
    </div>
  );
};

export default Previewer;
