import { Box, Grid, LinearProgress, Typography } from "@mui/material"
import React from "react"
import theme from "../../../../styles/theme/Theme"
import usePoll from "../../../../utility/hooks/polls"
import { Poll as PollType, PollOption as PollOptionType } from "../../../../utility/types/trip"

function OptionResults({
  option,
  pollWidget,
  value,
}: {
  option: PollOptionType
  pollWidget: PollType
  value: number
}) {
  const { getIndex, poll } = usePoll(pollWidget)

  return (
    <LinearProgress
      sx={{ borderRadius: "2px", height: "10px" }}
      variant="determinate"
      color={
        getIndex(option.value) === poll.vote ? (theme.palette.highlight.main as any) : "secondary"
      } // highlights the option if the user voted for it
      value={value}
    />
  )
}

export default function PollResult({
  options,
  pollWidget,
}: {
  options: Array<PollOptionType>
  pollWidget: PollType
}) {
  const { pollResults, getIndex } = usePoll(pollWidget)
  const [percent, setPercent] = React.useState(0)


  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <>
        {options.map((option, index) => {
          setPercent(pollResults(getIndex(option.value)))

          return (
            <>
              <Grid container>
                <Grid item xs={10}>
                  <Typography sx={{ fontWeight: "bold" }}>{option.value}</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                  }}
                >
                  <Typography
                    style={{
                      textAlign: "right",
                      width: "100%",
                      fontSize: "12px",
                    }}
                  >
                    {percent}%
                  </Typography>
                </Grid>
              </Grid>
              <OptionResults key={index} option={option} pollWidget={pollWidget} value={percent} />
            </>
          )
        })}
      </>
    </Box>
  )
}
