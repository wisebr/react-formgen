import { ListItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

import FormgenContext from '../FormgenContext';
import { LibItemData } from '../types';

export interface LibraryItemProps {
  data: LibItemData;
  dragType: string;
  key: string;
}

const Item = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging?: boolean }>(({ theme, isDragging }) => ({
  opacity: isDragging ? .4 : 1,
  border: `1px dashed ${isDragging ? grey[500] : 'rgba(0,0,0,0)'}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'move',
  },
}));

const Icon = styled('span')({
  marginRight: 8,
  color: grey[700],
  position: 'relative',
  top: 2,
});

const LibraryItem: React.FC<LibraryItemProps> = ({ data: {element, id, name, thumb}, dragType }) => {
  const { getLocale, iconMap } = useContext(FormgenContext);
  const [{isDragging}, drag] = useDrag<
    { element: typeof element; id: string },
    unknown,
    { isDragging: boolean }
  >({
    type: dragType,
    item: { element, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  let icon: React.ReactNode = thumb;
  const key = thumb || element.type;
  if (key && typeof key === 'string') {
    const Comp = iconMap[key];
    if (Comp) {
      icon = <Comp />;
    }
  }

  const label = name || getLocale(`lib.element.${element.type}`);

  return (
    <Item
      isDragging={isDragging}
      ref={(node) => {
        drag(node);
      }}
    >
      <Icon>
        {icon}
      </Icon>
      {label}
    </Item>
  );
};

export default React.memo(LibraryItem);
