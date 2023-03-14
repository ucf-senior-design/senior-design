import SettingsIcon from "@mui/icons-material/Settings"
import { Typography } from "@mui/material"
import Header from "../../components/Header"
import PersonalInfo from "../../components/Settings/PersonalInfo"
import SecurityInfo from "../../components/Settings/SecurityInfo"
import UserHeader from "../../components/Settings/UserHeader"
import { useScreen } from "../../utility/hooks/screen"

export default function Account() {
  const { loading, updateLoading, updateErrorToast } = useScreen()

  function doNothing() {
    console.log("update")
  }

  return (
    <>
      <Header
        icon={<SettingsIcon sx={{ color: "white", fontWeight: "700", fontSize: "40px" }} />}
        title="account settings"
      />
      <UserHeader />
      <Typography variant="h5" sx={{ paddingBottom: 1, marginTop: 5 }}>
        update personal details
      </Typography>
      <PersonalInfo />
      <Typography variant="h5" sx={{ paddingBottom: 1, marginTop: 5 }}>
        update security details
      </Typography>
      <SecurityInfo />
    </>
  )
}
