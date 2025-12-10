import React, { useState } from "react"
import { useWorkflow } from "../../context/WorkflowContext"
import { validateWorkflow } from "../../utils/graphValidator"
import { simulateWorkflow, type SimulationEntry } from "../../apis/mockApi"

export function SimulationPanel() {
  const { nodes, edges } = useWorkflow()
  const [errors, setErrors] = useState<string[]>([])
  const [log, setLog] = useState<SimulationEntry[]>([])
  const [loading, setLoading] = useState(false)

  const handleSimulate = async () => {
    const errs = validateWorkflow(nodes, edges)
    setErrors(errs)
    setLog([])
    if (errs.length) return

    setLoading(true)
    try {
      const result = await simulateWorkflow(nodes, edges)
      setLog(result)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const json = JSON.stringify({ nodes, edges }, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "workflow.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="panel">
      <h3>Workflow Test / Sandbox</h3>
      <button onClick={handleSimulate} disabled={loading}>
        {loading ? "Simulating..." : "Run Simulation"}
      </button>{" "}
      <button onClick={handleExport}>Export JSON</button>

      {errors.length > 0 && (
        <div className="error-list">
          <h4>Validation Errors</h4>
          <ul>
            {errors.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {log.length > 0 && (
        <div className="log-list">
          <h4>Execution Log</h4>
          <ul>
            {log.map((entry) => (
              <li key={entry.step}>
                <strong>Step {entry.step}</strong> – Node {entry.nodeId}: {entry.message} (
                {entry.status})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
