import { Paper } from "@mui/material"
import { DateRange as ReactDateRange } from "react-date-range"

export default function DateRange({
  startDate,
  endDate,
  updateDates,
}: {
  startDate: Date
  endDate: Date
  updateDates(startDate: Date, endDate: Date): void
}) {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <ReactDateRange
        direction="horizontal"
        months={1}
        rangeColors={["#3F3D56", "#545270", "#DEDBFF"]}
        ranges={[
          {
            key: "selection",
            startDate: startDate,
            endDate: endDate,
          },
        ]}
        onChange={(e) =>
          updateDates(e.selection.startDate ?? new Date(), e.selection.endDate ?? new Date())
        }
      />
    </Paper>
  )
}
