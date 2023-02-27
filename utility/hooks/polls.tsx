import React from 'react';
import { createFetchRequestOptions } from '../fetch';
import { Poll } from '../types/trip';
import { useAuth } from './authentication';
import { useTrip } from './trip';

interface PollUseState extends Poll {
    showAddPopUp: boolean;
    showAllPollsPopUp: boolean;
    newPoll: string;
    voted: boolean;
}

interface ResultState{
    totalEach: {
        optionValue: string
        voterCount: number
    }[];
}

export type usePollHook = {
    doesUserOwn: () => boolean;
    didUserVote: () => boolean;
    submit: (selectedOption: string, select: boolean) => Promise<void>;
    getOption: (grabbedPoll: Poll) => string | undefined;
    results: () => void;
}

export default function usePoll(s: Poll):
usePollHook {
    const {user} = useAuth();
    const {trip} = useTrip();

    const userID = user?.uid ?? '';
    const tripID = trip.uid;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [poll, setPoll] = React.useState<PollUseState>({
        showAddPopUp: false,
        showAllPollsPopUp: false,
        newPoll: '',
        voted: false,
        ...s,
    });

    const [pollResult, setPollResults] = React.useState<ResultState>({
        totalEach: []
    })
    
    const [option, setOption] = React.useState('');

    /**
     * Checks to see if a user owns a poll
     * @param owner uid for the poll
     * @returnstrue if the user owns the poll and false otherwise
     */
    function doesUserOwn() {
        return poll.owner === userID;
    }

    /**
     * Checks if user voted.
     * @param option uid for the poll.
     * @returns true if the user has voted and false otherwise.
     */
    function didUserVote() {
        const isVoted = poll.options.some(option => option.voters.includes(userID))
        return isVoted !== undefined ? isVoted : false;
    }

    /**
   * Allows a user to vote on an option
   * @param selectedOption the uid of the option/value the user wants to select.
   */
    async function submit(selectedOption: string, select: boolean) {
        const options = createFetchRequestOptions(JSON.stringify({}), 'PUT');
        if (select && option !== '') {
            await fetch(
                `${API_URL}trip/${tripID}/polls/vote/${poll.uid}/${selectedOption}`,
                options
            ).then ((response) => {
                if(response.ok) {
                    // store option locally
                    const idx = poll.options.findIndex(option => option.value === selectedOption)
                    const newPoll = poll.options
                    const pollOption = newPoll[idx]

                    setPoll((option) => {
                        if (pollOption) {
                            pollOption.voters.push(userID);
                        } return {
                            ...option,
                            option: newPoll,
                            voted: true
                        }
                    })
                } else {
                    alert('try again later');
                }
            })
            .catch(() => {})
        } else {
            alert('please select an option')
        }
    }

    /**
     * @param selectedOption the option/value the user selected
     * @param select boolean if the current option is selected
     * if user leaves page without submitting, poll option only stored locally, api will only be called once the user submits
     */
    function toggleSelect(selectedOption: string, select: boolean) {
        // don't have to toggle on/off, just save the new option the user selects
        if (select && selectedOption !== '') {
            setOption(selectedOption)
            // store option locally
            const idx = poll.options.findIndex(option => option.value === selectedOption)
            const newPoll = poll.options
            const pollOption = newPoll[idx]

            setPoll((option) => {
                if (pollOption) {
                    pollOption.voters.push(userID);
                } return {
                    ...option,
                    option: newPoll
                }
            })
        } else {
            alert('try again later');
        }
    }

    /**
     * @param grabbedPoll the poll to find out what the user selected
     * @returns the option the user selected, otherwise undefined
     */
    function getOption(grabbedPoll: Poll): string | undefined {
        // iterate through options, searching if userid exists
        return didUserVote() ? grabbedPoll.options.find(option => option.voters.includes(userID))?.value : undefined
    }

    /**
     * counts number of voters for each option and sets it into pollResults
     */
    function results() {
        const total = poll.options.map((option) =>{
            const count = option.voters.reduce((acc) => acc + 1, 0);
            return {
                optionValue: option.value,
                voterCount: count
            }
        })

        setPollResults({
            totalEach: total
        })
    }

    return {
        doesUserOwn,
        didUserVote,
        submit,
        getOption,
        results
    };
}