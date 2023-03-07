import { Circle, CircleOutlined } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { PollOption as PollOptionType } from "../../../../utility/types/trip"

function PollOption({ option, selected }: { option: string; selected: boolean }) {
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
        // TODO: Handle the user selecting on a poll option.
      }}
    >
      {selected ? <Circle /> : <CircleOutlined />} {option}
    </div>
  )
}

export default function PollVote({ options }: { options: Array<PollOptionType> }) {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <>
          {/** TODO: Handle whether the option is selected or not. */}
          {options.map((option, index) => {
            return <PollOption key={index} option={option.value} selected={false} />
          })}
        </>
      </Box>

      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "10px" }}
        onClick={() =>
          // TODO: Create fetch request to vote on the poll.
          console.log("submit vote")
        }
      >
        Submit
      </Button>
    </>
  )
}
