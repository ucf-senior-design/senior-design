import SettingsIcon from "@mui/icons-material/Settings"
import { Stack } from "@mui/system"
import Image from "next/image"
import Header from "../../components/Header"
import PersonalInfo from "../../components/Settings/PersonalInfo"
import SecurityInfo from "../../components/Settings/SecurityInfo"
import UserHeader from "../../components/Settings/UserHeader"
import { useAuth } from "../../utility/hooks/authentication"

export default function Account() {
  const { user } = useAuth()

  return (
    <>
      <Header
        icon={<SettingsIcon sx={{ color: "white", fontWeight: "700", fontSize: "40px" }} />}
        title="account settings"
      />
      <UserHeader user={user} />
      <Stack direction={"row"}>
        <PersonalInfo user={user} />
        <SecurityInfo />
        <Image src="/settings.svg" alt="settings" width={500} height={500} />
      </Stack>
    </>
  )
}
