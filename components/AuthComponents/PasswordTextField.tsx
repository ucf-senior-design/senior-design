import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { ReactNode, useState } from "react"

export const PasswordTextField = ({
  error,
  helperText,
  id,
  value,
  label,
  placeholder,
  onChange,
}: {
  error: boolean
  helperText: String | ReactNode
  id: string
  value: String
  label: String
  placeholder: string
  onChange: any
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <TextField
      required
      color="secondary"
      error={error}
      helperText={helperText}
      id={id}
      value={value}
      label={label}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
