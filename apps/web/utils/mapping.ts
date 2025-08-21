export const dataToNodes = (data) => {
  return data.map((item, index) => ({
    id: JSON.stringify(item.id),
    parentId: item.parent_id,
    type: 'custom',
    data: { label: `${item.name} - ${item.description || ''}` },
    position: { x: 0, y: index * 70 },
  }));
};

export const dataToEdges = (
  data: any[],
): { id: string; source: string; target: string }[] => {
  const edges: { id: string; source: string; target: string }[] = [];
  data.forEach((item) => {
    if (item.parent_id) {
      edges.push({
        id: `e${item.id}`,
        source: JSON.stringify(item.parent_id),
        target: JSON.stringify(item.id),
      });
    }
  });
  return edges;
};
