import React from 'react';
import { createFetchRequestOptions } from '../fetch';
import { Poll, SuggestionOption, SuggestionWidget, Trip } from '../types/trip';

interface TripUseState extends Trip {
  suggestions?: Map<string, SuggestionWidget>;
}
export default function useTrip(t: Trip) {
  const [trip, setTrip] = React.useState<TripUseState>(t);
  const userID = '';
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function initilizeTrip() {
    let suggestionWidgets = await getSuggestionWidgetData([]);

    if (suggestionWidgets === null) {
      alert('Cannot load trip.');
      return;
    }

    console.log('initializing trip....');
    setTrip({ ...trip, suggestions: suggestionWidgets });
  }

  async function getSuggestionWidgetData(suggestionIDs: Array<string>) {
    suggestionIDs = [
      '6iTldrtHhzzysFMhOgRM',
      '5SIaabTavwsmKGPrfTGy',
      'F5UkHGJPJtCNNM3c0nIv',
    ];
    let promises: Array<Promise<Response>> = [];
    const suggestionWidgets = new Map<string, SuggestionWidget>();

    suggestionIDs.forEach((id) => {
      promises.push(
        fetch(`${API_URL}trip/${trip.uid}/suggestion/${id}`, {
          method: 'GET',
        })
      );
    });

    await Promise.all(promises).then((responses) => {
      responses.forEach(async (response) => {
        if (response.ok) {
          const data = await response.json();

          const suggestions = new Map<string, SuggestionOption>();
          data.suggestions.forEach((s: any) => {
            suggestions.set(s.uid, {
              ...s,
              likes: new Set(s.likes),
            } as SuggestionOption);
            suggestionWidgets.set(data.uid, {
              uid: data.uid,
              owner: data.owner,
              title: data.title,
              suggestions: suggestions,
            });
          });
        }
      });
    });
    return suggestionWidgets;
  }

  return { initilizeTrip, trip };
}
