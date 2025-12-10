import React from "react";
import { NodeConfigPanel } from "../panels/NodeConfigPanel";

interface Props {
  nodeId: string | null;
  onClose: () => void;
}

export function NodeEditModal({ nodeId, onClose }: Props) {
  if (!nodeId) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 420,
          maxHeight: "80vh",
          overflowY: "auto",
          background: "#ffffff",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 24px 48px rgba(0,0,0,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <NodeConfigPanel selectedNodeId={nodeId} />
        <button onClick={onClose} style={{ marginTop: 10, width: "100%" }}>
          Close
        </button>
      </div>
    </div>
  );
}
