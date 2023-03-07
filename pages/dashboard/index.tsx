import { Luggage } from "@mui/icons-material"
import React from "react"
import Header from "../../components/Header"
import ViewTrips from "../../components/Dashboard/ViewTrips"
import { DashboardProvider } from "../../utility/hooks/dashboard"
import { useScreen } from "../../utility/hooks/screen"

export default function Index() {
  const { updateAutoPadding } = useScreen()

  React.useEffect(() => {
    updateAutoPadding(false)
  }, [])

  return (
    <DashboardProvider>
      <Header
        icon={<Luggage sx={{ color: "white", fontWeight: "700", fontSize: "40px" }} />}
        title="trips"
      />
      <ViewTrips />
    </DashboardProvider>
  )
}
