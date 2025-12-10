import type { WorkflowNode, WorkflowEdge } from "../types/workflow"

export function validateWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]): string[] {
  const errors: string[] = []

  const startNodes = nodes.filter((n) => n.data.type === "start")
  if (startNodes.length === 0) errors.push("Workflow must contain a Start node.")
  if (startNodes.length > 1) errors.push("Workflow must contain only one Start node.")

  const endNodes = nodes.filter((n) => n.data.type === "end")
  if (endNodes.length === 0) errors.push("Workflow should contain an End node.")

  const incoming: Record<string, number> = {}
  edges.forEach((e) => {
    incoming[e.target] = (incoming[e.target] || 0) + 1
  })

  nodes.forEach((n) => {
    if (n.data.type !== "start" && !incoming[n.id]) {
      errors.push(`Node ${n.id} has no incoming connection.`)
    }
  })

  const adj: Record<string, string[]> = {}
  edges.forEach((e) => {
    if (!adj[e.source]) adj[e.source] = []
    adj[e.source].push(e.target)
  })

  const visited = new Set<string>()
  const stack = new Set<string>()

  const dfs = (id: string) => {
    if (stack.has(id)) throw new Error("CYCLE")
    if (visited.has(id)) return
    visited.add(id)
    stack.add(id)
    ;(adj[id] || []).forEach((nbr) => dfs(nbr))
    stack.delete(id)
  }

  try {
    nodes.forEach((n) => dfs(n.id))
  } catch (e: any) {
    if (e.message === "CYCLE") errors.push("Cycle detected in workflow.")
  }

  return errors
}
