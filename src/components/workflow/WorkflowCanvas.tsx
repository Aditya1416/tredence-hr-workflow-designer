// src/components/workflow/WorkflowCanvas.tsx
import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type EdgeChange,
  type NodeChange,
  type OnConnect,
  Handle,
  Position,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflow } from "../../context/WorkflowContext";
import type {
  WorkflowNode,
  WorkflowEdge,
  NodeType,
} from "../../types/workflow";

interface WorkflowCanvasProps {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export function WorkflowCanvas({ setSelectedNodeId }: WorkflowCanvasProps) {
  const { nodes, edges, dispatch } = useWorkflow();
  const { project } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (params) => {
      const updated = addEdge(params, edges as Edge[]) as WorkflowEdge[];
      dispatch({ type: "SET_EDGES", edges: updated });
    },
    [edges, dispatch]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updated = applyNodeChanges(
        changes,
        nodes as WorkflowNode[]
      ) as WorkflowNode[];
      dispatch({ type: "SET_NODES", nodes: updated });
    },
    [nodes, dispatch]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updated = applyEdgeChanges(
        changes,
        edges as WorkflowEdge[]
      ) as WorkflowEdge[];
      dispatch({ type: "SET_EDGES", edges: updated });
    },
    [edges, dispatch]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData(
        "application/reactflow"
      ) as NodeType;
      if (!type) return;

      const bounds = (event.target as HTMLDivElement).getBoundingClientRect();
      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const id = `${type}-${Date.now()}`;
      const newNode: WorkflowNode = {
        id,
        type,
        position,
        data: {
          label: type,
          type,
          config: getDefaultConfig(type),
        } as any,
      };

      dispatch({
        type: "SET_NODES",
        nodes: [...(nodes as WorkflowNode[]), newNode],
      });
    },
    [nodes, dispatch, project]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: WorkflowNode) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const nodeTypes = {
    start: (props: any) => <BaseNode {...props} label="Start" color="#d9f99d" />,
    task: (props: any) => <BaseNode {...props} label="Task" color="#bfdbfe" />,
    approval: (props: any) => (
      <BaseNode {...props} label="Approval" color="#fde68a" />
    ),
    automated: (props: any) => (
      <BaseNode {...props} label="Automated" color="#e9d5ff" />
    ),
    end: (props: any) => <BaseNode {...props} label="End" color="#fecaca" />,
  };

  return (
    <div className="workflow-canvas" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes as WorkflowNode[]}
        edges={edges as Edge[]}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={20} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

interface BaseNodeProps {
  data: any;
  label: string;
  color: string;
}

function BaseNode({ data, label, color }: BaseNodeProps) {
  const cfg = data?.config || {};

  return (
    <div
      style={{
        position: "relative",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid rgba(148, 163, 184, 0.7)",
        background: color,
        minWidth: 180,
        boxShadow: "0 8px 16px rgba(15, 23, 42, 0.12)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#0f172a",
          border: "2px solid white",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#0f172a",
          border: "2px solid white",
        }}
      />

      <div style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.6 }}>
        {label}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>
        {cfg.title || data.label}
      </div>

      {Array.isArray(cfg.metadata) && cfg.metadata.length > 0 && (
        <div style={{ marginTop: 6 }}>
          {cfg.metadata.map((m: any, idx: number) => (
            <div key={idx} style={{ fontSize: 11, opacity: 0.75 }}>
              {m.key}: {m.value}
            </div>
          ))}
        </div>
      )}

      {Array.isArray(cfg.customFields) && cfg.customFields.length > 0 && (
        <div style={{ marginTop: 6 }}>
          {cfg.customFields.map((f: any, idx: number) => (
            <div key={idx} style={{ fontSize: 11, opacity: 0.75 }}>
              {f.key}: {f.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getDefaultConfig(type: NodeType): any {
  switch (type) {
    case "start":
      return { title: "Start", metadata: [] };
    case "task":
      return {
        title: "Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: [],
      };
    case "approval":
      return { title: "Approval", approverRole: "Manager", threshold: 0 };
    case "automated":
      return { title: "Automation", actionId: "", params: {} };
    case "end":
      return { message: "Completed", summary: true };
    default:
      return {};
  }
}
