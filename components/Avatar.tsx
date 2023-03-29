import { Avatar as MuiAvatar } from "@mui/material"
import { useTrip } from "../utility/hooks/trip"
export default function Avatar({
  name,
  image,
  size,
}: {
  name: string
  image?: string
  size?: number
}) {
  const { trip } = useTrip()
  function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = "#"

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size,
        height: size,
      },
      children:
        name.split(" ").length >= 2
          ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
          : name.split(" ")[0][0],
    }
  }
  if (image) {
    return (
      <MuiAvatar alt={name} src={image} sx={size ? { width: size, height: size } : undefined} />
    )
  }
  return <MuiAvatar {...stringAvatar(name)} />
}
