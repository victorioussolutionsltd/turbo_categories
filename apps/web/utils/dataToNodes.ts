export const dataToNodes = (data) => {
  return data.map((item, index) => ({
    id: JSON.stringify(item.id),
    parentId: item.parent_id,
    type: 'custom',
    data: { label: `${item.name} - ${item.description || ''}` },
    position: { x: 0, y: index * 70 },
  }));
};
