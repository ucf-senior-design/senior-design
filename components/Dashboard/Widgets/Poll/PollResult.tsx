import { Box, Grid, LinearProgress, Typography } from "@mui/material"
import theme from "../../../../styles/theme/Theme"
import usePoll from "../../../../utility/hooks/polls"
import { Poll as PollType, PollOption as PollOptionType } from "../../../../utility/types/trip"

function OptionResults({ value, didUserVote }: { value: number; didUserVote: boolean }) {
  return (
    <LinearProgress
      sx={{ borderRadius: "2px", height: "10px" }}
      variant="determinate"
      color={didUserVote ? (theme.palette.highlight.main as any) : "secondary"} // highlights the option if the user voted for it
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
  const { pollResults, didUserVote } = usePoll(pollWidget)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                    {pollResults(index)}%
                  </Typography>
                </Grid>
              </Grid>
              <OptionResults
                key={index}
                value={pollResults(index)}
                didUserVote={didUserVote(index)}
              />
            </>
          )
        })}
      </>
    </Box>
  )
}
