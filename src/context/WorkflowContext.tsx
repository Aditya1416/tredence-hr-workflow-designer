import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { WorkflowNode, WorkflowEdge } from "../types/workflow";

// ----------------- State & Actions -----------------

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

type WorkflowAction =
  | { type: "SET_NODES"; nodes: WorkflowNode[] }
  | { type: "SET_EDGES"; edges: WorkflowEdge[] }
  | { type: "UPDATE_NODE_CONFIG"; nodeId: string; config: any };

// If you want to start with an empty canvas, keep nodes: [].
// If you have some initial nodes defined elsewhere, you can plug them in here.
const initialState: WorkflowState = {
  nodes: [],
  edges: [],
};

// ----------------- Reducer -----------------

function workflowReducer(
  state: WorkflowState,
  action: WorkflowAction
): WorkflowState {
  switch (action.type) {
    case "SET_NODES":
      return { ...state, nodes: action.nodes };

    case "SET_EDGES":
      return { ...state, edges: action.edges };

    case "UPDATE_NODE_CONFIG": {
      const updatedNodes = state.nodes.map((node) => {
        if (node.id !== action.nodeId) return node;

        const newConfig = action.config || {};
        const oldData: any = node.data || {};

        return {
          ...node,
          data: {
            ...oldData,
            // main display label on the card – prefer the new title
            label:
              newConfig.title ??
              oldData.title ??
              oldData.label ??
              node.data?.label,
            // full config object used by forms / simulation
            config: newConfig,
          },
        };
      });

      return { ...state, nodes: updatedNodes };
    }

    default:
      return state;
  }
}

// ----------------- Context -----------------

interface WorkflowContextValue extends WorkflowState {
  dispatch: React.Dispatch<WorkflowAction>;
}

const WorkflowContext = createContext<WorkflowContextValue | undefined>(
  undefined
);

// ----------------- Provider -----------------

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(workflowReducer, initialState);

  return (
    <WorkflowContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkflowContext.Provider>
  );
}

// ----------------- Hook -----------------

export function useWorkflow(): WorkflowContextValue {
  const ctx = useContext(WorkflowContext);
  if (!ctx) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return ctx;
}
