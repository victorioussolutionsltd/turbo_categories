import { Connections } from '../types';

export const difference = (obj1: Connections, obj2: Connections) => {
  const diff: Connections = {};
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  keys.forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key] ?? null;
    }
  });

  return diff;
};
