import React from "react"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export default function useCreateSuggestion() {
  const { createSuggestion } = useTrip()
  const { updateErrorToast } = useScreen()
  const [title, updateTitle] = React.useState<string>()
  const [suggestionItems, updateSuggestionItems] = React.useState<Array<string>>([])

  async function create(callback: (isSuccess: boolean) => void) {
    if (title === undefined) {
      updateErrorToast("suggestion must have a title")
      return
    }

    if (suggestionItems.length === 0) {
      updateErrorToast("must have one or more items to suggest")
      return
    }

    await createSuggestion(title, suggestionItems, (response) => {
      if (response.isSuccess) {
        callback(true)
      } else {
        updateErrorToast(response.errorMessage)
      }
    })
  }

  return { create, title, updateTitle, suggestionItems, updateSuggestionItems }
}
