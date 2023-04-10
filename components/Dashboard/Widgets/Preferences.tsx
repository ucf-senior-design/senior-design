import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ParkIcon from "@mui/icons-material/Park"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import SportsTennisIcon from "@mui/icons-material/SportsTennis"
import { Box, Button, Chip, Paper, Typography } from "@mui/material"
import React from "react"
import theme from "../../../styles/theme/Theme"
import usePreferences, { usePreferenceHook } from "../../../utility/hooks/preferences"

export function PreferencesWidget({ p }: { p: usePreferenceHook }) {
  const { sendVote, getVoteCount, hasUserVote } = usePreferences(p)
  const [showAdd, setShowAdd] = React.useState(false)
  return (
    <>
      <Paper sx={{ padding: "20px", width: "100%", margin: "10px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center", padding: "1" }}>
          {p.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <Typography variant={"h6"} sx={{ $headerStyle }}>
            {" "}
            cost preferences
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                onDoubleClick={() => sendVote(["VERYHIGHPRICE"])}
                disabled={hasUserVote("VERYHIGHPRICE")}
              >
                <Chip
                  variant={hasUserVote("VERYHIGHPRICE") ? "filled" : "outlined"}
                  icon={<AttachMoneyIcon />}
                  label={
                    <Typography padding={1} fontSize={14}>
                      very high - {getVoteCount("VERYHIGHPRICE")}
                    </Typography>
                  }
                  size="medium"
                  sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
                />
              </Button>
              <Button
                onDoubleClick={() => sendVote(["HIGHPRICE"])}
                disabled={hasUserVote("HIGHPRICE")}
              >
                <Chip
                  variant={hasUserVote("HIGHPRICE") ? "filled" : "outlined"}
                  icon={<AttachMoneyIcon />}
                  label={
                    <Typography padding={1} fontSize={14}>
                      high - {getVoteCount("HIGHPRICE")}
                    </Typography>
                  }
                  size="medium"
                  sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
                />
              </Button>
              <Button
                onDoubleClick={() => sendVote(["MEDPRICE"])}
                disabled={hasUserVote("MEDPRICE")}
              >
                <Chip
                  variant={hasUserVote("MEDPRICE") ? "filled" : "outlined"}
                  icon={<AttachMoneyIcon />}
                  label={
                    <Typography padding={1} fontSize={14}>
                      medium - {getVoteCount("MEDPRICE")}
                    </Typography>
                  }
                  size="medium"
                  sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
                />
              </Button>
              <Button
                onDoubleClick={() => sendVote(["LOWPRICE"])}
                disabled={hasUserVote("LOWPRICE")}
              >
                <Chip
                  variant={hasUserVote("LOWPRICE") ? "filled" : "outlined"}
                  icon={<AttachMoneyIcon />}
                  label={
                    <Typography padding={1} fontSize={14}>
                      low - {getVoteCount("LOWPRICE")}
                    </Typography>
                  }
                  size="medium"
                  sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
                />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant={"h6"} sx={{ $headerStyle }}>
              activitiy preferences
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                onDoubleClick={async () => await sendVote(["NATURE"])}
                disabled={hasUserVote("NATURE")}
              >
                <Chip
                  variant={hasUserVote("NATURE") ? "filled" : "outlined"}
                  icon={<SportsTennisIcon />}
                  label={
                    <Typography padding={1} fontSize={14}>
                      nature - {getVoteCount("NATURE")}
                    </Typography>
                  }
                  size="medium"
                  sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
                />
              </Button>
              <Button
                onDoubleClick={async () => await sendVote(["SPORTS"])}
                disabled={hasUserVote("SPORTS")}
              >
                <Chip
                  variant={hasUserVote("SPORTS") ? "filled" : "outlined"}
                  icon={<ParkIcon />}
                  label={
                    <Typography padding={1} fontSize={14}>
                      sports - {getVoteCount("SPORTS")}
                    </Typography>
                  }
                  size="medium"
                  sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
                />
              </Button>
              <Button
                onDoubleClick={async () => await sendVote(["SIGHTSEEING"])}
                disabled={hasUserVote("SIGHTSEEING")}
              >
                <Chip
                  variant={hasUserVote("SIGHTSEEING") ? "filled" : "outlined"}
                  icon={<PhotoCameraIcon />}
                  label={
                    <Typography padding={1} fontSize={14}>
                      sightseeing - {getVoteCount("SIGHTSEEING")}
                    </Typography>
                  }
                  size="medium"
                  sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  )
}

const $headerStyle: React.CSSProperties = {
  fontWeight: 500,
  color: theme.palette.secondary.main,
  padding: 5,
}
