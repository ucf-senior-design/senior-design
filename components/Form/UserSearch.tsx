import { Search } from "@mui/icons-material"
import { Box, IconButton, SxProps, TextField, Theme } from "@mui/material"
import { useState } from "react"
import { useAuth } from "../../utility/hooks/authentication"
import { User } from "../../utility/types/user"

export default function UserSearch({
  handleFoundUser,
  sx,
  placeholder,
}: {
  handleFoundUser: (user: User) => void
  sx?: SxProps<Theme>
  placeholder?: string
}) {
  const [search, setSearch] = useState("")
  const { doSearch } = useAuth()

  return (
    <Box sx={{ ...sx, display: "flex" }} alignContent={"start"} flexDirection={"row"}>
      <IconButton
        onClick={async () => {
          await doSearch(search, (user) => {
            handleFoundUser(user)
            setSearch("")
          })
        }}
      >
        <Search />
      </IconButton>

      <TextField
        sx={{ flexGrow: 1 }}
        color="secondary"
        value={search}
        id="search-bar"
        className="text"
        onInput={(e) => {
          // @ts-ignore
          setSearch(e.target.value)
        }}
        label={placeholder === undefined ? "search by username" : placeholder}
      />
    </Box>
  )
}
