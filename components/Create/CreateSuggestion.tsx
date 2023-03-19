import ChipInput from "material-ui-chip-input"
export default function CreateSuggestion({ closeModal }: { closeModal: () => void }) {
  return (
    <>
      <div> hello </div>
      <ChipInput defaultValue={["foo", "bar"]} onChange={(chips) => {}} />
    </>
  )
}
