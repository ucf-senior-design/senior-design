import React from 'react';
import { createFetchRequestOptions } from '../fetch';
import { SuggestionOption, SuggestionWidget, Trip } from '../types/trip';
import { useDashboard } from './dashboard';

interface TripUseState extends Trip {
  suggestions: Map<string, SuggestionWidget>;
}

interface TripContext {
  trip: TripUseState;
  initilizeTrip: () => Promise<void>;

  // handle suggestions
  createSuggestion: () => Promise<void>;
  deleteSuggestion: (uid: string) => Promise<void>;

  // handle polls
  createPoll: () => Promise<void>;
  deletePoll: (uid: string) => Promise<void>;

  // handle weather widget
  createWeather: () => Promise<void>;
  deleteWeather: (uid: string) => Promise<void>;
}

const TripContext = React.createContext<TripContext>({} as TripContext);

export function useTrip(): TripContext {
  const context = React.useContext(TripContext);

  if (!context) {
    throw Error('useAuth must be used within an TripProvider');
  }
  return context;
}
export function TripProvider({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  // TODO: remove this and read in the trip in the initilizeTrip() function

  const [trip, setTrip] = React.useState<TripUseState>({
    uid: 'sample',
    attendees: new Set(),
    duration: {
      start: new Date(),
      end: new Date(),
    },
    destination: 'Ohio',
    suggestions: new Map<string, SuggestionWidget>(),
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function initilizeTrip() {
    let trip = await getTrip();
    let suggestionWidgets = await getSuggestionWidgetData([]);

    if (suggestionWidgets === null || trip === null) {
      alert('Cannot load trip.');
      return;
    }

    console.log('initializing trip....');
    setTrip({ ...trip, suggestions: suggestionWidgets });
  }

  async function getTrip() {
    console.log(id);
    const options = createFetchRequestOptions(null, 'GET');
    let t = null;
    const response = await fetch(`${API_URL}trip/${id}`, options);
    if (response.ok) {
      t = (await response.json()) as Trip;
    }
    return t;
  }
  async function getSuggestionWidgetData(suggestionIDs: Array<string>) {
    const suggestionWidgets = new Map<string, SuggestionWidget>();

    await fetch(`${API_URL}trip/${trip.uid}/suggestion/`, {
      method: 'GET',
    }).then(async (response) => {
      if (response.ok) {
        console.log('res', response);

        const { data } = await response.json();

        const suggestions = new Map<string, SuggestionOption>();
        data.forEach((s: any) => {
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
    return suggestionWidgets;
  }

  // TODO: Allow a user to create a suggestion widget for the trip.
  async function createSuggestion() {}

  // TODO: Allow a user to delete a suggestion widget for the trip.
  async function deleteSuggestion(uid: string) {}

  // TODO: Allow a user to create a poll widget for the trip.
  async function createPoll() {}

  // TODO: Allow a user to delete a poll widget for the trip.
  async function deletePoll(uid: string) {}

  // TODO: Allow a user to create a weather widget for the trip.
  async function createWeather() {}

  // TODO: Allow a user to delete a weather widget for the trip.
  async function deleteWeather(uid: string) {}

  React.useEffect(() => {
    console.log('getting data for trip:', id);
    initilizeTrip();
  }, []);

  return (
    <TripContext.Provider
      value={{
        initilizeTrip,
        trip,
        createSuggestion,
        deleteSuggestion,
        createPoll,
        deletePoll,
        createWeather,
        deleteWeather,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
