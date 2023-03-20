import SettingsIcon from "@mui/icons-material/Settings"
import { Stack, Box } from "@mui/system"
import Image from "next/image"
import Header from "../../components/Header"
import PersonalInfo from "../../components/Settings/PersonalInfo"
import UserHeader from "../../components/Settings/UserHeader"
import { useAuth } from "../../utility/hooks/authentication"

export default function Account() {
  return (
    <>
      <UserHeader />
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <PersonalInfo />
      </Box>

      <Stack direction={"row"}>
        {/* <Image src="/settings.svg" alt="settings" width={500} height={500} /> */}
      </Stack>
    </>
  )
}
