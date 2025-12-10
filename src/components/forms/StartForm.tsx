import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../context/WorkflowContext";

interface StartFormProps {
  nodeId: string;
}

interface MetaRow {
  key: string;
  value: string;
}

export function StartForm({ nodeId }: StartFormProps) {
  const { nodes, dispatch } = useWorkflow();
  const node = nodes.find((n) => n.id === nodeId);

  const initialConfig = (node?.data?.config as any) || {
    title: "Start",
    metadata: [] as MetaRow[],
  };

  const [title, setTitle] = useState<string>(initialConfig.title || "Start");
  const [metadata, setMetadata] = useState<MetaRow[]>(initialConfig.metadata || []);

  // Re-sync local state if node/config changes
  useEffect(() => {
    const cfg = (node?.data?.config as any) || {};
    setTitle(cfg.title || "Start");
    setMetadata(cfg.metadata || []);
  }, [nodeId, node?.data?.config]);

  const updateMeta = (index: number, field: "key" | "value", value: string) => {
    setMetadata((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addMeta = () => {
    setMetadata((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeMeta = (index: number) => {
    setMetadata((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMetadata = metadata.filter((m) => m.key || m.value);

    dispatch({
      type: "UPDATE_NODE_CONFIG",
      nodeId,
      config: {
        title: title || "Start",
        metadata: cleanMetadata,
      },
    });
  };

  return (
    <form className="node-form" onSubmit={onSubmit}>
      <label>
        Start title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Employee Onboarding Initiated"
        />
      </label>

      <div style={{ marginTop: 8, marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
        Metadata
      </div>
      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>
        Optional key–value pairs, e.g. <code>source = Portal</code>
      </div>

      {metadata.map((row, idx) => (
        <div
          key={idx}
          style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}
        >
          <input
            placeholder="Key"
            value={row.key}
            onChange={(e) => updateMeta(idx, "key", e.target.value)}
            style={{
              flex: 1,
              padding: "5px 7px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 12,
            }}
          />
          <input
            placeholder="Value"
            value={row.value}
            onChange={(e) => updateMeta(idx, "value", e.target.value)}
            style={{
              flex: 1,
              padding: "5px 7px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 12,
            }}
          />
          <button
            type="button"
            onClick={() => removeMeta(idx)}
            style={{
              borderRadius: 999,
              border: "none",
              background: "transparent",
              fontSize: 16,
              cursor: "pointer",
              color: "#94a3b8",
            }}
          >
            ×
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addMeta}
        style={{
          fontSize: 12,
          padding: "4px 8px",
          borderRadius: 6,
          border: "1px solid #475569",
          background: "#f1f5f9",
          cursor: "pointer",
          color: "#1e293b",
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        + Add
      </button>

      <button type="submit" style={{ marginTop: 8, width: "100%" }}>
        Save start node
      </button>
    </form>
  );
}
