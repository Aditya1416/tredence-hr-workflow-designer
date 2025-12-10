import React, { useState } from "react"
import { ReactFlowProvider } from "reactflow"
import { WorkflowProvider } from "./context/WorkflowContext"
import { WorkflowCanvas } from "./components/workflow/WorkflowCanvas"
import { NodePalette } from "./components/workflow/NodePalette"
import { NodeConfigPanel } from "./components/panels/NodeConfigPanel"
import { SimulationPanel } from "./components/panels/SimulationPanel"
import "./index.css"

function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  return (
    <ReactFlowProvider>
      <WorkflowProvider>
        <div className="app-root">
          {/* Left: Palette */}
          <aside className="sidebar">
            <h2>Node Palette</h2>
            <p>Drag nodes into the canvas.</p>
            <NodePalette />
          </aside>

          {/* Center: Canvas */}
          <main className="canvas-wrapper">
            <WorkflowCanvas
              selectedNodeId={selectedNodeId}
              setSelectedNodeId={setSelectedNodeId}
            />
          </main>

          {/* Right: Node config + sandbox */}
          <aside className="right-panel">
            <NodeConfigPanel selectedNodeId={selectedNodeId} />
            <SimulationPanel />
          </aside>
        </div>
      </WorkflowProvider>
    </ReactFlowProvider>
  )
}

export default App
