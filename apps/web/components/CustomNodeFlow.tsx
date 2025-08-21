import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback, useEffect } from 'react';

import '@xyflow/react/dist/style.css';

import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface CustomNodeFlowProps {
  data: any[];
}

const CustomNodeFlow = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.data);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useEffect(() => {
    console.log({ edges });
  }, [edges]);

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
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
