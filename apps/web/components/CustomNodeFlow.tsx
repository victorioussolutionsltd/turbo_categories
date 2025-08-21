import {
  addEdge,
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';

import '@xyflow/react/dist/style.css';

import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const CustomNodeFlow = (props) => {
  console.log({ props });

  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

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
    </ReactFlow>
  );
};

export default CustomNodeFlow;
