import React from "react"

const NODE_TYPES = [
  { type: "start", label: "Start Node" },
  { type: "task", label: "Task Node" },
  { type: "approval", label: "Approval Node" },
  { type: "automated", label: "Automated Step" },
  { type: "end", label: "End Node" },
]

export function NodePalette() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div>
      {NODE_TYPES.map((n) => (
        <div
          key={n.type}
          className="node-palette-item"
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
        >
          {n.label}
        </div>
      ))}
    </div>
  )
}
