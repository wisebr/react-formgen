import { ClickAwayListener, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import { useDrop } from 'react-dnd';

import ElementSwitch from './ElementSwitch';
import ElementWrapper from './ElementWrapper';
import FormgenContext from './FormgenContext';
import SettingPanel from './SettingPanel';
import { ElementOptions, LibraryDragItem } from './types';

export interface PreviewerProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    height: '100%',
  },
});

const Previewer: React.FC<PreviewerProps> = ({ className }) => {
  const classes = useStyles();
  const {
    elements,
    elementMap,
    dispatchElement,
    activeElement,
    activedElement,
    getLocale,
  } = useContext(FormgenContext);

  const [collectedProps, drop] = useDrop<LibraryDragItem, void, {}>({
    accept: 'library',
    drop: item => {
      (function addElement (element?: ElementOptions) {
        if (!element) {
          console.error(`there is no element ${item.name} config in "elementMap"`);
          return;
        }
        if (element.items) {
          element.items.forEach(el => {
            addElement(el);
          });
        } else {
          const payload = {
            order: 0,
            name: '',
            required: false,
            hidden: false,
            meta: {},
            props: {},
            ...element,
            locales: {
              ...element.locales,
              title: getLocale(`lib.${element.type}`),
            },
          };
          dispatchElement({ type: 'ADD_ELEMENT', payload });
        }
      })(elementMap[item.name]);
      console.log('dropped item:', item);
    },
  });

  const createElementClickHandler = (id: string) => () => activeElement(id);

  const handleClickAwayElements = useCallback(() => activeElement(''), []);

  console.log('render previewer, collectedProps:', collectedProps);
  return (
    <Grid container className={classNames(classes.root, className)}>
      <ClickAwayListener onClickAway={handleClickAwayElements}>
        <>
          <Grid item xs={activedElement ? 8 : 12} ref={drop}>
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
          </Grid>
          {!!activedElement && (
            <Grid item xs={4}>
              <SettingPanel />
            </Grid>
          )}
        </>
      </ClickAwayListener>
    </Grid>
  );
};

export default Previewer;
