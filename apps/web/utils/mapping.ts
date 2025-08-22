import { Edge } from '@xyflow/react';
import { Category, Connections } from '../types';

const VERTICAL_SPACING = 70;

export const dataToNodes = (data) => {
  return data.map((item, index) => ({
    id: JSON.stringify(item.id),
    parentId: item.parent_id,
    type: 'custom',
    data: { label: `${item.name} - ${item.description || ''}` },
    position: { x: 0, y: index * VERTICAL_SPACING },
    deletable: false,
  }));
};

export const dataToEdges = (
  data: Category[],
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

export const dataToConnectionsMap = (data: Category[]): Connections => {
  const connections: Connections = {};
  data.forEach((item) => {
    if (item.parent_id) {
      connections[JSON.stringify(item.id)] = item.parent_id;
    }
  });
  return connections;
};

export const edgesToConnectionMap = (edges: Edge[]): Connections => {
  const connections: Connections = {};
  edges.forEach((edge) => {
    connections[edge.target] = JSON.parse(edge.source) ?? null;
  });
  return connections;
};
