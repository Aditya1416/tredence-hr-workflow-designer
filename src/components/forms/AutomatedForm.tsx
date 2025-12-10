import React, { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useWorkflow } from "../../context/WorkflowContext"
import { getAutomations, type AutomationAction } from "../../apis/mockApi"
import type { AutomatedConfig } from "../../types/workflow"

interface AutomatedFormValues {
  title: string
  actionId: string
  params: Record<string, string>
}

export function AutomatedForm({ nodeId }: { nodeId: string }) {
  const { nodes, dispatch } = useWorkflow()
  const node = nodes.find((n) => n.id === nodeId)
  const config: AutomatedConfig =
    (node?.data.config as AutomatedConfig) || ({
      title: "Automation",
      actionId: "",
      params: {},
    } as AutomatedConfig)

  const [actions, setActions] = useState<AutomationAction[]>([])

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<AutomatedFormValues>({
    defaultValues: {
      title: config.title,
      actionId: config.actionId,
      params: config.params || {},
    },
  })

  const selectedActionId = watch("actionId")
  const selectedAction = useMemo(
    () => actions.find((a) => a.id === selectedActionId),
    [actions, selectedActionId]
  )

  useEffect(() => {
    getAutomations().then(setActions)
  }, [])

  useEffect(() => {
    reset({
      title: config.title,
      actionId: config.actionId,
      params: config.params || {},
    })
  }, [config, reset])

  // When action changes, ensure params object has correct keys
  useEffect(() => {
    if (selectedAction) {
      const current = watch("params") || {}
      const next: Record<string, string> = {}
      selectedAction.params.forEach((key) => {
        next[key] = current[key] || ""
      })
      setValue("params", next, { shouldDirty: true })
    }
  }, [selectedAction, setValue, watch])

  const onSubmit = (values: AutomatedFormValues) => {
    const clean: AutomatedConfig = {
      title: values.title,
      actionId: values.actionId,
      params: values.params || {},
    }
    dispatch({ type: "UPDATE_NODE_CONFIG", nodeId, config: clean })
  }

  return (
    <form className="node-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title
        <input {...register("title")} placeholder="Send welcome email" />
      </label>

      <label>
        Action
        <select {...register("actionId")}>
          <option value="">Select an action…</option>
          {actions.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </label>

      {selectedAction && (
        <div style={{ marginTop: 8 }}>
          <h4 style={{ fontSize: 13, marginBottom: 4 }}>Parameters</h4>
          {selectedAction.params.map((paramKey) => (
            <label key={paramKey}>
              {paramKey}
              <input
                {...register(`params.${paramKey}` as const)}
                placeholder={`Enter ${paramKey}`}
              />
            </label>
          ))}
        </div>
      )}

      <button type="submit" disabled={!isDirty} style={{ marginTop: 8, width: "100%" }}>
        Save automated step
      </button>
    </form>
  )
}
