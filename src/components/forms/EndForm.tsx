import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useWorkflow } from "../../context/WorkflowContext"
import type { EndConfig } from "../../types/workflow"

export function EndForm({ nodeId }: { nodeId: string }) {
  const { nodes, dispatch } = useWorkflow()
  const node = nodes.find((n) => n.id === nodeId)
  const config: EndConfig =
    (node?.data.config as EndConfig) || ({ message: "Completed", summary: true } as EndConfig)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<EndConfig>({
    defaultValues: config,
  })

  useEffect(() => {
    reset(config)
  }, [config, reset])

  const onSubmit = (values: EndConfig) => {
    dispatch({ type: "UPDATE_NODE_CONFIG", nodeId, config: values })
  }

  return (
    <form className="node-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        End message
        <input {...register("message")} placeholder="Onboarding completed" />
      </label>

      <label className="checkbox-row">
        <input type="checkbox" {...register("summary")} />
        Include summary
      </label>

      <button type="submit" disabled={!isDirty} style={{ marginTop: 8, width: "100%" }}>
        Save end node
      </button>
    </form>
  )
}
