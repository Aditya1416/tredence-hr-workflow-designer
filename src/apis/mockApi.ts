import type { WorkflowNode, WorkflowEdge } from "../types/workflow"

export interface AutomationAction {
  id: string
  label: string
  params: string[]
}

// Mock GET /automations
export const MOCK_AUTOMATIONS: AutomationAction[] = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
]

export async function getAutomations(): Promise<AutomationAction[]> {
  await delay(300)
  return MOCK_AUTOMATIONS
}

// Mock POST /simulate
export interface SimulationEntry {
  step: number
  nodeId: string
  message: string
  status: "ok" | "warning" | "error"
}

export async function simulateWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
  await delay(500)

  const log: SimulationEntry[] = []
  let step = 1

  const startNodes = nodes.filter((n) => n.data.type === "start")
  if (startNodes.length === 0) {
    log.push({
      step: step++,
      nodeId: "none",
      message: "No Start node found",
      status: "error",
    })
    return log
  }

  const sortedNodes = [...nodes].sort((a, b) => a.id.localeCompare(b.id))

  for (const node of sortedNodes) {
    log.push({
      step: step++,
      nodeId: node.id,
      message: `Executed node ${node.id} (${node.data.type})`,
      status: "ok",
    })
  }

  if (!nodes.some((n) => n.data.type === "end")) {
    log.push({
      step: step++,
      nodeId: "none",
      message: "No End node found",
      status: "warning",
    })
  } else {
    log.push({
      step: step++,
      nodeId: "end",
      message: "Workflow completed",
      status: "ok",
    })
  }

  return log
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
