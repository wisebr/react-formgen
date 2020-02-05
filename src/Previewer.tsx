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
}

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    height: '100%',
  },
});

const Previewer: React.FC<PreviewerProps> = ({ className, acceptDropType = BASE_LIBRARY_TYPE }) => {
  const classes = useStyles();
  const {
    elements,
    onAddElement,
    activeElement,
    activedElement,
    getLocale,
  } = useContext(FormgenContext);

  const [collectedProps, drop] = useDrop<LibraryDragItem, void, {}>({
    accept: acceptDropType,
    drop: item => {
      (function addElement (element: ElementOptions) {
        if (element.elements) {
          element.elements.forEach(el => {
            addElement(el);
          });
        } else {
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
          onAddElement(payload);
        }
      })(item.element);
      console.log('dropped item:', item);
    },
  });

  const createElementClickHandler = (id: string) => () => activeElement(id);

  console.log('render previewer, collectedProps:', collectedProps);
  return (
    <div className={classNames(classes.root, className)} ref={drop}>
      {elements.map(el => (
        <ElementWrapper
          key={el.id}
          id={el.id}
          actived={!!activedElement && activedElement.id === el.id}
          onClick={createElementClickHandler(el.id)}
        >
          <ElementSwitch data={el} />
        </ElementWrapper>
      ))}
    </div>
  );
};

export default Previewer;
