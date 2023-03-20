import React from "react"
import { Poll } from "../types/trip"
import { useAuth } from "./authentication"
import { useScreen } from "./screen"
import { useTrip } from "./trip"

interface PollUseState extends Poll {
  vote: number | undefined
  totalVotes: number
  didSubmit: boolean
}

export type usePollHook = {
  hasUserVoted: () => boolean
  doesUserOwn: () => boolean
  didUserVote: (index: number) => boolean
  doVote: () => Promise<void>
  showResults: () => boolean
  selectOption: (index: number) => void
  pollResults: (index: number) => number
}

export default function usePoll(p: Poll): usePollHook {
  const { user } = useAuth()
  const { trip } = useTrip()
  const { updateErrorToast } = useScreen()

  const userID = user?.uid ?? ""
  const tripID = trip.uid

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [poll, setPoll] = React.useState<PollUseState>({
    didSubmit: false,
    vote: undefined,
    totalVotes: 1,
    ...p,
  })

  React.useEffect(() => {
    let totalVotes = 0
    let vote: string | undefined = undefined
    p.options.forEach((option) => {
      totalVotes += option.voters.length
      vote =
        option.voters.find((voter) => {
          return voter == userID
        }) !== undefined
          ? option.value
          : undefined
    })

    setPoll({
      didSubmit: vote === undefined ? false : true,
      vote: vote,
      totalVotes: totalVotes,
      ...p,
    })
  }, [])

  function hasUserVoted() {
    return poll.didSubmit
  }
  /**
   * Checks to see if a user owns a poll
   */
  function doesUserOwn() {
    return poll.owner === userID
  }

  /**
   * Checks if user voted.
   */
  function didUserVote(index: number) {
    return poll.vote === undefined ? false : poll.vote === index
  }

  /**
   * Allows a user to vote on an option
   */
  async function doVote() {
    if (poll.vote === undefined) {
      updateErrorToast("Must select an option to vote.")
      return
    }
    let vote = poll.vote
    await fetch(`${API_URL}trip/${tripID}/polls/vote/${poll.uid}/${vote}`, { method: "PUT" }).then(
      (response) => {
        if (response.ok) {
          let tOptions = Array.from(p.options)
          tOptions[vote].voters.push(userID)

          setPoll({
            ...poll,
            didSubmit: true,
            vote: vote,
            options: tOptions,
            totalVotes: poll.totalVotes + 1,
          })
        } else {
          updateErrorToast("Could not cast vote at the time.")
        }
      },
    )
  }

  /**
   * Stores the user vote before submitting.
   */
  function selectOption(index: number) {
    setPoll({
      ...poll,
      vote: index,
    })
  }

  /**
   * Calculates results for a certain option
   */
  function pollResults(index: number) {
    return (poll.options[index].voters.length / poll.totalVotes) * 100
  }

  /**
   * Show the results if the user has voted.
   */
  function showResults() {
    return poll.didSubmit === true
  }

  return {
    doesUserOwn,
    didUserVote,
    doVote,
    selectOption,
    pollResults,
    showResults,
    hasUserVoted,
  }
}
