import React from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onClose: () => void;
}

export function ContextMenu({
  x,
  y,
  onEdit,
  onDelete,
  onDuplicate,
  onClose,
}: ContextMenuProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "#ffffff",
        borderRadius: 8,
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        padding: "6px 0",
        zIndex: 1000,
        width: 160,
      }}
      onMouseLeave={onClose}
    >
      <MenuItem title="Edit node" onClick={onEdit} />
      <MenuItem title="Duplicate" onClick={onDuplicate} />
      <MenuItem title="Delete" onClick={onDelete} />
    </div>
  );
}

function MenuItem({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <div
      style={{
        padding: "8px 14px",
        fontSize: 14,
        cursor: "pointer",
        color: "#0f172a",
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {title}
    </div>
  );
}
