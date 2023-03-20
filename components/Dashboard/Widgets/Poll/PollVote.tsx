import { Circle, CircleOutlined } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import usePoll, { usePollHook } from "../../../../utility/hooks/polls"
import { Poll as PollType, PollOption as PollOptionType } from "../../../../utility/types/trip"

function PollOption({
  option,
  selected,
  handleSelect,
}: {
  option: string
  selected: boolean
  handleSelect: () => void
}) {
  return (
    <Button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        color: selected ? "#3F3D56" : "#BBB",
        padding: "10px",
        border: `1.5px solid ${selected ? "#3F3D56" : "#BBB"}`,
        borderRadius: "5px",
        justifyContent: "start",
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (e.isPropagationStopped()) {
          handleSelect()
        }
      }}
    >
      {selected ? <Circle /> : <CircleOutlined />} {option}
    </Button>
  )
}

export default function PollVote({
  options,
  poll,
}: {
  options: Array<PollOptionType>
  poll: usePollHook
}) {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", height: "100%" }}>
        <>
          {options.map((option, index) => {
            return (
              <PollOption
                key={index}
                option={option.value}
                selected={poll.didUserVote(index)}
                handleSelect={() => poll.selectOption(index)}
              />
            )
          })}
        </>
      </Box>

      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "10px" }}
        onClick={() => poll.doVote()}
      >
        Submit
      </Button>
    </>
  )
}
