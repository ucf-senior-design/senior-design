import { Circle, CircleOutlined } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import usePoll from "../../../../utility/hooks/polls"
import { Poll as PollType, PollOption as PollOptionType } from "../../../../utility/types/trip"

function PollOption({
  option,
  selected,
  index,
  selectOption,
}: {
  option: string
  selected: boolean
  index: number
  selectOption: (index: number) => void
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        color: selected ? "#3F3D56" : "#BBB",
        padding: "10px",
        border: `1.5px solid ${selected ? "#3F3D56" : "#BBB"}`,
        borderRadius: "5px",
      }}
      onClick={(e) => {
        selectOption(index)
      }}
    >
      {selected ? <Circle /> : <CircleOutlined />} {option}
    </div>
  )
}

export default function PollVote({
  options,
  pollWidget,
}: {
  options: Array<PollOptionType>
  pollWidget: PollType
}) {
  const { doVote, didUserVote, selectOption } = usePoll(pollWidget)

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <>
          {options.map((option, index) => {
            return (
              <PollOption
                key={index}
                option={option.value}
                selected={didUserVote(index) !== undefined ? true : false}
                index={index}
                selectOption={selectOption}
              />
            )
          })}
        </>
      </Box>

      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "10px" }}
        onClick={() => doVote()}
      >
        Submit
      </Button>
    </>
  )
}
