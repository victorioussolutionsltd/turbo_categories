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
import { useCallback, useEffect } from 'react';

import '@xyflow/react/dist/style.css';

import { dataToEdges, dataToNodes } from '../utils/mapping';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface CustomNodeFlowProps {
  data: any[];
  onSave: (edges: Edge[]) => void;
}

const CustomNodeFlow = ({ data, onSave }: CustomNodeFlowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(dataToNodes(data));
  const [edges, setEdges, onEdgesChange] = useEdgesState(dataToEdges(data));

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useEffect(() => {
    console.log({ edges });
  }, [edges]);

  useEffect(() => {
    console.log({ nodes });
  }, [nodes]);

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
