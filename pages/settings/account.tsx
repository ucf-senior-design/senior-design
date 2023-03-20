import { Stack, Box } from "@mui/system"
import CreateBox from "../../components/Create/CreateBox"
import PersonalInfo from "../../components/Settings/PersonalInfo"
import UserHeader from "../../components/Settings/UserHeader"

export default function Account() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CreateBox>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <UserHeader />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PersonalInfo />
          </Box>

          <Stack direction={"row"}>
            {/* <Image src="/settings.svg" alt="settings" width={500} height={500} /> */}
          </Stack>
        </div>
      </CreateBox>
    </Box>
  )
}
