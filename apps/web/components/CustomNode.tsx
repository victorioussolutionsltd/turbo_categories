import { Position } from '@xyflow/react';
import { memo } from 'react';

import CustomHandle from './CustomHandle';

interface CustomNodeProps {
  data: {
    label: string;
  };
}

const CustomNode = ({ data }: CustomNodeProps) => {
  return (
    <div>
      <CustomHandle
        type="target"
        position={Position.Left}
        connectionCount={1}
      />
      {data.label}
      <CustomHandle
        type="source"
        position={Position.Right}
        connectionCount={1}
      />
    </div>
  );
};

export default memo(CustomNode);
