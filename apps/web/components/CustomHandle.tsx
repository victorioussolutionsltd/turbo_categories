import { Handle, useNodeConnections } from '@xyflow/react';

const CustomHandle = (props) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={
        props.connectionCount
          ? connections.length < props.connectionCount
          : true
      }
    />
  );
};

export default CustomHandle;
