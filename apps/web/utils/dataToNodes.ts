import { Position } from '@xyflow/react';

export const dataToNodes = (data) => {
  console.log({ data });

  return data.map((item, index) => ({
    id: JSON.stringify(item.id),
    type: 'custom',
    data: { label: `${item.name} - ${item.description || ''}` },
    position: { x: 0, y: index * 70 },
    sourcePosition: Position.Right,
  }));
};
