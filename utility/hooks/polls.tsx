import React from 'react';
import { Poll } from '../types/trip';
import { useAuth } from './authentication';
import { useTrip } from './trip';

interface PollUseState extends Poll {
    voted: boolean;
    option: string;
    opTotal: number;
}

export type usePollHook = {
    doesUserOwn: () => boolean;
    didUserVote: () => string | undefined;
    submit: (selectedOption: string) => Promise<void>;
    toggleSelect: (selectedOption: string) => void;
    pollResults: () => Array<number> | undefined;
}

export default function usePoll(s: Poll):
usePollHook {
    const {user} = useAuth();
    const {trip} = useTrip();

    const userID = user?.uid ?? '';
    const tripID = trip.uid;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [poll, setPoll] = React.useState<PollUseState>({
        voted: false,
        option: '',
        opTotal: 0,
        ...s,
    });
    const [totalVotes, setTotalVotes] = React.useState(0)
    const [result, setResult] = React.useState<Array<number>>([]);

    // making sure variables are changed and properly stored on update
    React.useEffect(() => {}, [poll])

    React.useEffect(() => {
        if (poll.voted) {
            // store total results
            const total = poll.options.reduce(
                (acc, optionVal) => acc + optionVal.voters.length, 0
            )
            setTotalVotes(total);

            // store results per option
            const totalPerOption = poll.options.map((op) => {
                return (op.voters.length / totalVotes) * 100
            })
            setResult(totalPerOption);
        }
    }, [poll, totalVotes])

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
     * @returns the selected option if user voted.
     */
    function didUserVote() {
        const isVoted = poll.options.some(option => option.voters.includes(userID))
        return isVoted ? poll.option : undefined
    }

    /**
   * Allows a user to vote on an option
   */
    async function submit() {
        if (poll.option !== '') {

            const index = poll.options.findIndex(optionVal => optionVal.value === poll.option)

            await fetch(
                `${API_URL}trip/${tripID}/polls/vote/${poll.uid}/${index}`
            ).then ((response) => {
                if(response.ok) {

                    // just add user to list of voters
                    const pollVoters = poll.options[index];
                    pollVoters.voters.push(userID);

                    setPoll({
                        ...poll,
                        voted: true,
                        opTotal: pollVoters.voters.length
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
     * if user leaves page without submitting, poll option only stored locally, api will only be called once the user submits
     */
    function toggleSelect(selectedOption: string) {
        setPoll({
            ...poll,
            option: selectedOption
        })
    }

    /**
     * 
     * @returns result array if it exists
     */
    function pollResults() {
        return result ? result : undefined
    }

    return {
        doesUserOwn,
        didUserVote,
        submit,
        toggleSelect,
        pollResults
    };
}