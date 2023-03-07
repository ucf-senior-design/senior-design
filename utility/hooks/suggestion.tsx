import React from "react"
import { createFetchRequestOptions } from "../fetch"
import { SuggestionOption, SuggestionWidget } from "../types/trip"
import { useAuth } from "./authentication"
import { useTrip } from "./trip"

// Type of the Suggestion useState used in this custom hook
interface SuggestionUseState extends SuggestionWidget {
  showAddPopUp: boolean
  showAllSuggestionsPopUp: boolean
  newSuggestion: string
}

// All of the values and functions returned from this use state
export type useSuggestionHook = {
  addSuggestion: () => Promise<void>
  didUserLike: (option: string) => boolean
  like: (selectedOption: string) => Promise<void>
  unLike: (selectedOption: string) => Promise<void>
  deleteSuggestion: (callback: (isSuccess: boolean) => void) => Promise<void>
  suggestion: SuggestionUseState
  toggleAddPopUp: () => void
  storeNewSuggestion: (newSuggestion: string) => void
  toggleShowAllSuggestionsPopUp: () => void
  doesUserOwn: (option: string) => boolean
}

export default function useSuggestion(s: SuggestionWidget): useSuggestionHook {
  const { user } = useAuth()
  const { trip } = useTrip()

  const userID = user?.uid ?? ""
  const tripID = trip.uid

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [suggestion, setSuggestion] = React.useState<SuggestionUseState>({
    showAddPopUp: false,
    newSuggestion: "",
    showAllSuggestionsPopUp: false,
    ...s,
  })

  /**
   * Checks to see if a user owners a suggestion
   * @param option uid for the suggestion
   * @returnstrue if the user owns the suggestion and false otherwise
   */
  function doesUserOwn(option: string) {
    return suggestion.suggestions.get(option)?.owner === userID
  }

  /**
   * Checks if a user liked a suggestion.
   * @param option uid for the suggestion.
   * @returns true if the user has liked the suggestion and false otherwise.
   */
  function didUserLike(option: string) {
    const isLiked = suggestion.suggestions.get(option)?.likes.has(userID)
    return isLiked !== undefined ? isLiked : false
  }

  /**
   * Stores the user's text input in the popup for adding a new suggestion.
   * @param newSuggestion the user's new suggestion.
   */
  function storeNewSuggestion(newSuggestion: string) {
    setSuggestion({
      ...suggestion,
      newSuggestion: newSuggestion,
    })
  }

  /**
   * Calls the endpoint to add the user's new suggestion to the database.
   */
  async function addSuggestion() {
    // Creates the fetch request.
    const options = createFetchRequestOptions(
      JSON.stringify({ suggestion: suggestion.newSuggestion }),
      "PUT",
    )
    await fetch(`${API_URL}trip/${tripID}/suggestion/add/${suggestion.uid}`, options).then(
      async (response) => {
        if (response.ok) {
          // If successful, store the new suggestion locally.
          // Note: A user automatically likes a suggestion that they create.

          const data = (await response.json()) as SuggestionOption
          const newSuggestions = new Map(suggestion.suggestions)
          newSuggestions.set(data.uid, {
            uid: data.uid,
            likes: new Set(data.likes),
            owner: data.owner,
            option: suggestion.newSuggestion,
          })

          setSuggestion({
            ...suggestion,
            suggestions: newSuggestions,
            showAddPopUp: false,
          })
        } else {
          alert("Try again later")
        }
      },
    )
  }

  /**
   * Allows a user to like a suggestion
   * @param selectedOption the uid of the suggestion the user is trying to like.
   */
  async function like(selectedOption: string) {
    // Create the fetch request.
    const options = createFetchRequestOptions(JSON.stringify({}), "PUT")
    await fetch(
      `${API_URL}trip/${tripID}/suggestion/like/${suggestion.uid}/${selectedOption}`,
      options,
    )
      .then((response) => {
        if (response.ok) {
          // If successful, store that the user likes the suggestion locally.
          const newSuggestions = new Map(suggestion.suggestions)
          const suggestionOption = newSuggestions.get(selectedOption)

          setSuggestion((suggestion) => {
            if (suggestionOption) {
              suggestionOption.likes.add(userID)
              newSuggestions.set(selectedOption, suggestionOption)
            }
            return {
              ...suggestion,
              suggestions: newSuggestions,
            }
          })
        } else {
          alert("Try Again Later")
        }
      })
      .catch(() => {})
  }

  /**
   * Allows a user to unlike a suggestion
   * @param selectedOption the uid of the suggestion the user is trying to like.
   */
  async function unLike(selectedOption: string) {
    const options = createFetchRequestOptions(JSON.stringify({}), "PUT")
    await fetch(
      `${API_URL}trip/${tripID}/suggestion/unLike/${suggestion.uid}/${selectedOption}`,
      options,
    ).then(async (response) => {
      if (response.ok) {
        setSuggestion((suggestion) => {
          const newSuggestions = new Map(suggestion.suggestions)
          const suggestionOption = newSuggestions.get(selectedOption)

          if (suggestionOption) {
            suggestionOption.likes.delete(userID)
            newSuggestions.set(selectedOption, suggestionOption)
          }
          return {
            ...suggestion,
            suggestions: newSuggestions,
          }
        })
      } else {
        alert("Try Again Later")
      }
    })
  }

  /**
   * Handles deleting a suggestino
   * TODO: Not implemented yet, but I have it ready in case we need it.
   * @param callback
   */
  async function deleteSuggestion(callback: (isSuccess: boolean) => void) {
    const options = createFetchRequestOptions(JSON.stringify({}), "DELETE")
    await fetch(`${API_URL}trip/${tripID}/suggestion/${suggestion.uid}`, options).then(
      async (response) => {
        if (response.ok) {
          callback(true)
        } else {
          callback(false)
        }
      },
    )
  }

  /**
   * Toggles the popup to show all suggestions from being displayed
   */
  function toggleShowAllSuggestionsPopUp() {
    setSuggestion({
      ...suggestion,
      showAllSuggestionsPopUp: !suggestion.showAllSuggestionsPopUp,
    })
  }

  /**
   * Toggles the popup to add a new suggestion from being displayed
   */
  function toggleAddPopUp() {
    setSuggestion({
      ...suggestion,
      showAddPopUp: !suggestion.showAddPopUp,
    })
  }

  return {
    addSuggestion,
    didUserLike,
    like,
    unLike,
    deleteSuggestion,
    suggestion,
    toggleAddPopUp,
    storeNewSuggestion,
    toggleShowAllSuggestionsPopUp,
    doesUserOwn,
  }
}
