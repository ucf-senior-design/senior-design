import React from "react"
import { API_URL } from "../constants"
import { createFetchRequestOptions } from "../fetch"
import { ActivityPref, ActivityPrefField } from "../types/trip"
import { useAuth } from "./authentication"
import { useScreen } from "./screen"
import { useTrip } from "./trip"

// All of the values and functions returned from this use state
export interface usePreferenceHook extends ActivityPref {
  uid: string
}

export default function usePreferences(p: usePreferenceHook) {
  const { user } = useAuth()
  const { trip } = useTrip()
  const { updateErrorToast } = useScreen()

  const [preference, setPreference] = React.useState<usePreferenceHook>(p)

  async function sendVote(votes: Array<ActivityPrefField>) {
    if (user === undefined) {
      return
    }
    const options = createFetchRequestOptions(
      JSON.stringify({
        activityPrefID: preference.uid,
        votes: votes,
        user: user?.uid ?? "uid",
      }),
      "PUT",
    )
    await fetch(`${API_URL}trip/${trip.uid}/activityPref/`, options).then(async (response) => {
      if (response.ok) {
        let voteSet = new Set(votes)
        setPreference({
          ...preference,
          sports: voteSet.has("SPORTS")
            ? new Array(preference.sports.push(user.uid))
            : preference.sports,
          nature: voteSet.has("NATURE")
            ? new Array(preference.nature.push(user.uid))
            : preference.nature,
          sightseeing: voteSet.has("SIGHTSEEING")
            ? new Array(preference.sightseeing.push(user.uid))
            : preference.sightseeing,
          lowPrice: voteSet.has("LOWPRICE")
            ? new Array(preference.lowPrice.push(user.uid))
            : preference.lowPrice,
          medPrice: voteSet.has("MEDPRICE")
            ? new Array(preference.medPrice.push(user.uid))
            : preference.medPrice,
          highPrice: voteSet.has("HIGHPRICE")
            ? new Array(preference.highPrice.push(user.uid))
            : preference.highPrice,
          veryHighPrice: voteSet.has("VERYHIGHPRICE")
            ? new Array(preference.veryHighPrice.push(user.uid))
            : preference.veryHighPrice,
        })
      } else {
        updateErrorToast("Try again later")
      }
    })
  }

  function hasUserVote(vote: ActivityPrefField) {
    if (vote === "SPORTS") {
      return new Set(preference.sports).has(user?.uid ?? "")
    }

    if (vote === "NATURE") {
      return new Set(preference.nature).has(user?.uid ?? "")
    }

    if (vote === "SIGHTSEEING") {
      return new Set(preference.sightseeing).has(user?.uid ?? "")
    }

    if (vote === "LOWPRICE") {
      return new Set(preference.lowPrice).has(user?.uid ?? "")
    }

    if (vote === "MEDPRICE") {
      return new Set(preference.medPrice).has(user?.uid ?? "")
    }

    if (vote === "HIGHPRICE") {
      return new Set(preference.highPrice).has(user?.uid ?? "")
    }

    if (vote === "VERYHIGHPRICE") {
      return new Set(preference.veryHighPrice).has(user?.uid ?? "")
    }

    return false
  }
  function getVoteCount(vote: ActivityPrefField) {
    if (vote === "SPORTS") {
      return preference.sports.length
    }

    if (vote === "NATURE") {
      return preference.nature.length
    }

    if (vote === "SIGHTSEEING") {
      return preference.sightseeing.length
    }

    if (vote === "LOWPRICE") {
      return preference.lowPrice.length
    }

    if (vote === "MEDPRICE") {
      return preference.medPrice.length
    }

    if (vote === "HIGHPRICE") {
      return preference.highPrice.length
    }

    if (vote === "VERYHIGHPRICE") {
      return preference.veryHighPrice.length
    }

    return 0
  }
  return {
    sendVote,
    getVoteCount,
    hasUserVote,
  }
}
