import { People } from "@mui/icons-material"
import Header from "../../components/Header"
import { FriendProvider } from "../../utility/hooks/friends"
import { useScreen } from "../../utility/hooks/screen"
import React from "react"
import FriendList from "../../components/Friends/FriendList"

export default function Friends() {
  const { updateAutoPadding } = useScreen()

  React.useEffect(() => {
    updateAutoPadding(false)
  }, [])

  return (
    <>
      <FriendProvider>
        <Header
          icon={<People sx={{ color: "white", fontWeight: "700", fontSize: "40px" }} />}
          title="friends"
        />
        <FriendList />
      </FriendProvider>
    </>
  )
}
