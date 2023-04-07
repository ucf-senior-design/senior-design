import React from "react"
import { createFetchRequestOptions } from "../fetch"
import { useAuth } from "./authentication"
import { useScreen } from "./screen"
import { useTrip } from "./trip"

// All of the values and functions returned from this use state
export type usePreferenceHook = {

}

export default function useSuggestion(p: PreferencesWidget): usePreferenceHook {
  const { user } = useAuth()
  const { trip } = useTrip()
  const { updateErrorToast } = useScreen()
  const userID = user?.uid ?? ""

  const tripID = trip.uid

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [preference, setPreference] = React.useState<PreferenceUseState>({
  })


  /**
   * Checks if a user voted on a preference - see results if so.
   * @param option uid for the suggestion.
   * @returns true if the user has liked the suggestion and false otherwise.
   */
  function didUserVote(option: string) {
    const voted = preference.preferences.get(option)?.votes.has(userID)
    return voted !== undefined ? voted : false
  }



  /**
   * Allows a user to vote on a preference
   * @param selectedOption the uid of the suggestion the user is trying to like.
   */
  async function sendVote(selectedOption: string) {
    const options = createFetchRequestOptions(JSON.stringify({}), "PUT")
    // await fetch(
    //   `${API_URL}trip/${tripID}/suggestion/like/${suggestion.uid}/${selectedOption}`,
    //   options,
    // )


      .then((response) => {
        if (response.ok) {
          // If successful, store that the user likes the suggestion locally.
          const suggestionVotes = preferences.get(selectedOption)

          setPreference((preference) => {
            if (preferenceOption) {
              preferenceOption.votes.add(userID)
              newPreferences.set(selectedOption, preferenceOption)
            }
            return {
              ...preference,
            }
          })
        } else {
          updateErrorToast("Try again later")
        }
      })
      .catch(() => {})
  }

  



  return {
        // addSuggestion,
        // didUserLike,
        // like,
        // unLike,
        // storeNewSuggestion,
        // doesUserOwn,
  }
}