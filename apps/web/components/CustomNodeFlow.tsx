import {
  addEdge,
  Background,
  Controls,
  Edge,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';

import '@xyflow/react/dist/style.css';

import { Category } from '../types';
import { dataToEdges, dataToNodes } from '../utils/mapping';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface CustomNodeFlowProps {
  data: Category[];
  onSave: (edges: Edge[]) => void;
}

const CustomNodeFlow = ({ data, onSave }: CustomNodeFlowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(dataToNodes(data));
  const [edges, setEdges, onEdgesChange] = useEdgesState(dataToEdges(data));

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const save = () => onSave(edges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Panel position="top-right">
        <button className="xy-theme__button" onClick={save}>
          SAVE
        </button>
      </Panel>
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
