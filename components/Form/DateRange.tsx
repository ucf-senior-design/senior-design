import { DateRangePicker } from 'react-date-range';

export default function DateRange({
  startDate,
  endDate,
  updateDates,
}: {
  startDate: Date;
  endDate: Date;
  updateDates(startDate: Date, endDate: Date): void;
}) {
  return (
    <>
      <DateRangePicker
        staticRanges={[]}
        inputRanges={[]}
        rangeColors={['#3F3D56', '#545270', '#DEDBFF']}
        ranges={[
          {
            key: 'selection',
            startDate: startDate,
            endDate: endDate,
          },
        ]}
        onChange={(e) =>
          updateDates(
            e.selection.startDate ?? new Date(),
            e.selection.endDate ?? new Date()
          )
        }
      />
    </>
  );
}
