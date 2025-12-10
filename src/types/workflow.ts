// src/types/workflow.ts
import type { Node, Edge } from "reactflow";

export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface StartConfig {
  title: string;
  metadata: { key: string; value: string }[];
}

export interface TaskConfig {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields: { key: string; value: string }[];
}

export interface ApprovalConfig {
  title: string;
  approverRole: string;
  threshold: number;
}

export interface AutomatedConfig {
  title: string;
  actionId: string;
  params: Record<string, string>;
}

export interface EndConfig {
  message: string;
  summary: boolean;
}

export type NodeConfig =
  | StartConfig
  | TaskConfig
  | ApprovalConfig
  | AutomatedConfig
  | EndConfig
  | any;

export interface WorkflowNodeData {
  type: NodeType;
  label: string;
  config: NodeConfig;
}

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;
