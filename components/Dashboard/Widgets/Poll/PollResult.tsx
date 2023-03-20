import { Box, Grid, LinearProgress, Typography } from "@mui/material"
import theme from "../../../../styles/theme/Theme"
import usePoll, { usePollHook } from "../../../../utility/hooks/polls"
import { Poll as PollType, PollOption as PollOptionType } from "../../../../utility/types/trip"

function OptionResults({ value, didUserVote }: { value: number; didUserVote: boolean }) {
  return (
    <LinearProgress
      sx={{ borderRadius: "2px", height: "10px" }}
      variant="determinate"
      color={didUserVote ? "warning" : "secondary"}
      value={value}
    />
  )
}

export default function PollResult({
  options,
  poll,
}: {
  options: Array<PollOptionType>
  poll: usePollHook
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", height: "100%" }}>
      <>
        {options.map((option, index) => {
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
                    {poll.pollResults(index)}%
                  </Typography>
                </Grid>
              </Grid>
              <OptionResults
                key={index}
                value={poll.pollResults(index)}
                didUserVote={poll.didUserVote(index)}
              />
            </>
          )
        })}
      </>
    </Box>
  )
}
