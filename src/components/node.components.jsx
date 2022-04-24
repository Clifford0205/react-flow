import React, { useState, useCallback } from 'react';

import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from 'react-flow-renderer';
import TextUpdaterNode from './TextUpdaterNode';
import './text-updater-node.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'textUpdater',
    position: { x: 400, y: 0 },
    data: { value: 123 },
  },

  {
    id: '5',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2' },
  },
  {
    id: '6',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },
    data: { label: 'node 3' },
  },

  {
    id: '7',
    type: 'group',
    data: { label: null },
    position: { x: 0, y: 0 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: '8',
    type: 'input',
    data: { label: 'child node 1' },
    position: { x: 10, y: 10 },
    parentNode: '7',
    extent: 'parent',
  },
  {
    id: '9',
    data: { label: 'child node 2' },
    position: { x: 10, y: 90 },
    parentNode: '7',
    extent: 'parent',
  },
  {
    id: '10',
    type: 'output',
    position: { x: -100, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 140,
      backgroundColor: 'rgba(240,240,240,0.25)',
    },
  },
  {
    id: '11',
    data: { label: 'Child 1' },
    position: { x: 50, y: 10 },
    parentNode: '10',
    extent: 'parent',
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: '12',
    data: { label: 'Child 2' },
    position: { x: 10, y: 90 },
    parentNode: '10',
    extent: 'parent',
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: '13',
    data: { label: 'Child 3' },
    position: { x: 100, y: 90 },
    parentNode: '10',
    extent: 'parent',
    draggable: false,
    style: {
      width: 60,
    },
  },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'edge-1', source: '4', target: '5', sourceHandle: 'a' },
  { id: 'edge-2', source: '4', target: '6', sourceHandle: 'b' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e9-10', source: '9', target: '10' },
];

const MindNode = () => {
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const defaultEdgeOptions = { animated: true };

  const onNodesChange = useCallback(
    changes => {
      console.log('onNodesChange');
      return setNodes(nds => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    changes => {
      console.log('onEdgesChange');
      return setEdges(eds => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    connection => {
      console.log('onConnect');
      return setEdges(eds => addEdge(connection, eds));
      // return setEdges(eds => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  let nodeId = 50;

  const addNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
    <>
      <ReactFlow
        style={{ width: '100%', height: '90vh' }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap
          nodeColor={n => {
            if (n.type === 'input') return 'blue';
          }}
        ></MiniMap>
        <Controls />
      </ReactFlow>

      <div>
        <input type="text" name="title" />
        <button type="button" onClick={addNode}>
          Add Node
        </button>
      </div>
    </>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <MindNode />
    </ReactFlowProvider>
  );
}
