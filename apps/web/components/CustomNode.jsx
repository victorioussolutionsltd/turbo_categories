import { Position } from '@xyflow/react';
import { memo } from 'react';

import CustomHandle from './CustomHandle';

const CustomNode = ({ data }) => {
  return (
    <div>
      <CustomHandle
        type="target"
        position={Position.Left}
        connectionCount={1}
      />
      <div>{data.label}</div>
      <div>{data.description}</div>
      <CustomHandle
        type="source"
        position={Position.Right}
        connectionCount={0}
      />
    </div>
  );
};

export default memo(CustomNode);
