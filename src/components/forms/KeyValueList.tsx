import React from "react"
import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form"

interface KeyValueListProps {
  control: Control<any>
  register: UseFormRegister<any>
  name: string
  label: string
  helperText?: string
}

export function KeyValueList({ control, register, name, label, helperText }: KeyValueListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <label style={{ fontSize: 13, fontWeight: 500 }}>{label}</label>
        <button
          type="button"
          onClick={() => append({ key: "", value: "" })}
          style={{
          fontSize: 12,
          padding: "4px 8px",
          borderRadius: "6px",
         border: "1px solid #475569",
         background: "#f1f5f9",
         cursor: "pointer",
         color: "#1e293b",
        fontWeight: 600
   }}    

        >
          + Add
        </button>
      </div>
      {helperText && (
        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{helperText}</div>
      )}

      {fields.length === 0 && (
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>No fields added yet.</div>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}
        >
          <input
            placeholder="Key"
            {...register(`${name}.${index}.key` as const)}
            style={{
              flex: 1,
              padding: "5px 7px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 12,
            }}
          />
          <input
            placeholder="Value"
            {...register(`${name}.${index}.value` as const)}
            style={{
              flex: 1,
              padding: "5px 7px",
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              fontSize: 12,
            }}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            style={{
              borderRadius: 999,
              border: "none",
              background: "transparent",
              fontSize: 16,
              cursor: "pointer",
              color: "#94a3b8",
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
