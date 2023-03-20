import { Paper, Typography } from "@mui/material"
import usePoll from "../../../../utility/hooks/polls"
import { Poll as PollType } from "../../../../utility/types/trip"
import WidgetHeader from "../WidgetHeader"
import PollResult from "./PollResult"
import PollVote from "./PollVote"

export default function Poll({ poll, showResults }: { poll: PollType; showResults: boolean }) {
  const pollHook = usePoll(poll)
  return (
    <Paper sx={{ padding: "20px", width: "100%", height: "100%" }}>
      <WidgetHeader owner={poll.owner} />
      <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
        {poll.title}
      </Typography>
      {pollHook.hasUserVoted() ? (
        <PollResult options={poll.options} poll={pollHook} />
      ) : (
        <PollVote options={poll.options} poll={pollHook} />
      )}
    </Paper>
  )
}
