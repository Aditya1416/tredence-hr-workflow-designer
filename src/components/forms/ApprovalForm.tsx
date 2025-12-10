import React, { useEffect, useState } from "react";
import { useWorkflow } from "../../context/WorkflowContext";

interface ApprovalFormProps {
  nodeId: string;
}

const ROLES = ["Manager", "HRBP", "Director", "Finance", "Custom"];

export function ApprovalForm({ nodeId }: ApprovalFormProps) {
  const { nodes, dispatch } = useWorkflow();
  const node = nodes.find((n) => n.id === nodeId);

  const initialConfig = (node?.data?.config as any) || {
    title: "Approval",
    approverRole: "Manager",
    threshold: 0,
  };

  const [title, setTitle] = useState(initialConfig.title || "Approval");
  const [approverRole, setApproverRole] = useState(
    initialConfig.approverRole || "Manager"
  );
  const [threshold, setThreshold] = useState(
    typeof initialConfig.threshold === "number"
      ? String(initialConfig.threshold)
      : "0"
  );

  useEffect(() => {
    const cfg = (node?.data?.config as any) || {};
    setTitle(cfg.title || "Approval");
    setApproverRole(cfg.approverRole || "Manager");
    setThreshold(
      typeof cfg.threshold === "number" ? String(cfg.threshold) : "0"
    );
  }, [nodeId, node?.data?.config]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericThreshold = Number(threshold);
    const safeThreshold = Number.isNaN(numericThreshold)
      ? 0
      : numericThreshold;

    dispatch({
      type: "UPDATE_NODE_CONFIG",
      nodeId,
      config: {
        title: title || "Approval",
        approverRole: approverRole || "Manager",
        threshold: safeThreshold,
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
          placeholder="Manager Approval"
        />
      </label>

      <label>
        Approver role
        <select
          value={approverRole}
          onChange={(e) => setApproverRole(e.target.value)}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label>
        Auto-approve threshold
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          placeholder="0"
        />
      </label>

      <button type="submit" style={{ marginTop: 8, width: "100%" }}>
        Save approval node
      </button>
    </form>
  );
}
