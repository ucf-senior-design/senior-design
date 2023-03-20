import { Paper } from "@mui/material"
import { DatePicker } from "antd"
import dayjs from "dayjs"

export default function DateRange({
  startDate,
  endDate,
  updateDates,
  showTime,
}: {
  startDate: Date
  endDate: Date
  updateDates(startDate: Date, endDate: Date): void
  showTime?: boolean
}) {
  return (
    <DatePicker.RangePicker
      getPopupContainer={(triggerNode) => {
        return triggerNode.parentNode as any
      }}
      style={{ width: "100%", padding: "15px" }}
      showTime={
        showTime
          ? {
              format: "HH:mm",
            }
          : undefined
      }
      onChange={(e) => {
        if (e !== null) console.log(e[0]?.toDate())
        if (e !== null) updateDates(e[0]?.toDate() ?? new Date(), e[1]?.toDate() ?? new Date())
      }}
    />
  )
}
