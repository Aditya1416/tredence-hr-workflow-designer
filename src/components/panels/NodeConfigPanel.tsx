import React from "react"
import { useWorkflow } from "../../context/WorkflowContext"
import { StartForm } from "../forms/StartForm"
import { TaskForm } from "../forms/TaskForm"
import { ApprovalForm } from "../forms/ApprovalForm"
import { AutomatedForm } from "../forms/AutomatedForm"
import { EndForm } from "../forms/EndForm"

interface Props {
  selectedNodeId: string | null
}

export function NodeConfigPanel({ selectedNodeId }: Props) {
  const { nodes } = useWorkflow()
  const node = nodes.find((n) => n.id === selectedNodeId)

  if (!node) {
    return (
      <div className="panel">
        <h3>Node Configuration</h3>
        <p>Select a node on the canvas to edit it.</p>
      </div>
    )
  }

  let FormComponent: React.ComponentType<{ nodeId: string }> | null = null

  switch (node.data.type) {
    case "start":
      FormComponent = StartForm
      break
    case "task":
      FormComponent = TaskForm
      break
    case "approval":
      FormComponent = ApprovalForm
      break
    case "automated":
      FormComponent = AutomatedForm
      break
    case "end":
      FormComponent = EndForm
      break
    default:
      FormComponent = null
  }

  return (
    <div className="panel">
      <h3>
        Edit {node.data.type} ({node.id})
      </h3>
      {FormComponent ? <FormComponent nodeId={node.id} /> : <p>No form for this node.</p>}
    </div>
  )
}
