import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../context/WorkflowContext";

interface TaskFormProps {
  nodeId: string;
}

interface KVRow {
  key: string;
  value: string;
}

export function TaskForm({ nodeId }: TaskFormProps) {
  const { nodes, dispatch } = useWorkflow();
  const node = nodes.find((n) => n.id === nodeId);

  const initialConfig = (node?.data?.config as any) || {
    title: "Task",
    description: "",
    assignee: "",
    dueDate: "",
    customFields: [] as KVRow[],
  };

  const [title, setTitle] = useState(initialConfig.title || "Task");
  const [description, setDescription] = useState(initialConfig.description || "");
  const [assignee, setAssignee] = useState(initialConfig.assignee || "");
  const [dueDate, setDueDate] = useState(initialConfig.dueDate || "");
  const [customFields, setCustomFields] = useState<KVRow[]>(
    initialConfig.customFields || []
  );

  useEffect(() => {
    const cfg = (node?.data?.config as any) || {};
    setTitle(cfg.title || "Task");
    setDescription(cfg.description || "");
    setAssignee(cfg.assignee || "");
    setDueDate(cfg.dueDate || "");
    setCustomFields(cfg.customFields || []);
  }, [nodeId, node?.data?.config]);

  const updateCustomField = (index: number, field: "key" | "value", value: string) => {
    setCustomFields((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addCustomField = () => {
    setCustomFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFields = customFields.filter((f) => f.key || f.value);

    dispatch({
      type: "UPDATE_NODE_CONFIG",
      nodeId,
      config: {
        title: title || "Task",
        description,
        assignee,
        dueDate,
        customFields: cleanFields,
      },
    });
  };

  return (
    <form className="node-form" onSubmit={onSubmit}>
      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Collect Joining Documents"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what needs to be done"
        />
      </label>

      <label>
        Assignee
        <input
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="HR Coordinator"
        />
      </label>

      <label>
        Due date
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      <div style={{ marginTop: 8, marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
        Custom fields
      </div>
      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>
        Optional task-specific key–value metadata.
      </div>

      {customFields.map((row, idx) => (
        <div
          key={idx}
          style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}
        >
          <input
            placeholder="Key"
            value={row.key}
            onChange={(e) => updateCustomField(idx, "key", e.target.value)}
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
            onChange={(e) => updateCustomField(idx, "value", e.target.value)}
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
            onClick={() => removeCustomField(idx)}
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
        onClick={addCustomField}
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
        Save task node
      </button>
    </form>
  );
}
