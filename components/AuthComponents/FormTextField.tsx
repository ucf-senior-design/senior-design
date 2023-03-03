import { TextField } from "@mui/material"

export const FormTextField = ({
  error,
  helperText,
  id,
  value,
  label,
  placeholder,
  onChange,
}: {
  error: boolean
  helperText: String
  id: string
  value: String
  label: String
  placeholder: string
  onChange: any
}) => {
  return (
    <TextField
      color="secondary"
      required
      error={error}
      helperText={helperText}
      id={id}
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      sx={{ marginBottom: 2 }}
    />
  )
}
