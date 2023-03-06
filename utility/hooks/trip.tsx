import React from 'react';
import { createFetchRequestOptions } from '../fetch';
import { Duration, Event, SuggestionOption, SuggestionWidget, Trip } from '../types/trip';
interface TripUseState extends Trip {
  suggestions: Map<string, SuggestionWidget>;
  joinableEvents: Array<Array<Event>>;
  itinerary: Array<Array<Event>>;
  destination: string;
}

interface TripDetails {
  duration: Duration;
  destination: string;
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

  // handle events
  createEvent: (event: Event, callback: (response: Response) => void) => Promise<void>;
  modifyTrip: (details: TripDetails, callback: (response: Response) => void) => Promise<void>;
}

// TODO: probably should import this 
interface Response {
  result?: any;
  isSuccess: boolean;
  errorMessage?: string;
}  

const TripContext = React.createContext<TripContext>({} as TripContext);

export function useTrip(): TripContext {
  const context = React.useContext(TripContext);

  if (!context) {
    throw Error('useTrip must be used within an TripProvider');
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
    uid: '',
    attendees: new Set(),
    duration: {
      start: new Date(),
      end: new Date(),
    },
    destination: '',
    suggestions: new Map<string, SuggestionWidget>(),
    itinerary: [],
    joinableEvents: [],
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function initilizeTrip() {
    let trip = await getTrip();
    let suggestionWidgets = await getSuggestionWidgetData();
    let eventData = await getEventData();

    if (suggestionWidgets === null || trip === null || eventData == null) {
      alert('Cannot load trip.');
      return;
    }

    console.log('initializing trip....');
    setTrip({
      ...trip,
      suggestions: suggestionWidgets,
      itinerary: eventData.userEvents,
      joinableEvents: eventData.joinableEvents,
    });
  }

  async function getSuggestionWidgetData() {
    const suggestionWidgets = new Map<string, SuggestionWidget>();

    await fetch(`${API_URL}trip/${id}/suggestion/`, {
      method: 'GET',
    }).then(async (response) => {
      if (response.ok) {
        const { data } = await response.json();

        data.forEach((s: any) => {
          const suggestions = new Map<string, SuggestionOption>();
          s.suggestions.forEach((sug: SuggestionOption) => {
            suggestions.set(sug.uid, {
              ...sug,
              likes: new Set(sug.likes),
            } as SuggestionOption);
          });

          suggestionWidgets.set(s.uid, {
            uid: s.uid,
            owner: s.owner,
            title: s.title,
            suggestions: suggestions,
          });
        });
      }
    });
    return suggestionWidgets;
  }
  async function getTrip() {
    const options = createFetchRequestOptions(null, 'GET');
    let t = null;
    const response = await fetch(`${API_URL}trip/${id}`, options);
    if (response.ok) {
      t = (await response.json()) as Trip;
    }
    return t;
  }

  function addEventToList(list: Array<Array<Event>>, event: Event) {
    if (list.length === 0) {
      list.push([
        {
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        },
      ]);
      return list;
    }

    if (
      new Date(list[list.length - 1][0].duration.start).toLocaleDateString() !==
      new Date(event.duration.start).toLocaleDateString()
    ) {
      list.push([
        {
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        },
      ]);
      return list;
    }

    list[list.length - 1].push({
      ...event,
      duration: {
        start: new Date(event.duration.start),
        end: new Date(event.duration.end),
      },
    });
    return list;
  }

  // TODO: Handle short break periods when determining joinable events
  async function getEventData() {
    let joinableEvents: Array<Array<Event>> = [];
    let userEvents: Array<Array<Event>> = [];

    const response = await fetch(`${API_URL}trip/${id}/event`, {
      method: 'GET',
    });

    if (response.ok) {
      let data = await response.json();

      const {
        joinable,
        itinerary,
      }: { joinable: Array<Event>; itinerary: Array<Event> } = data;

      // Determine actualy joinable events
      let joinableIndex = 0;

      itinerary.forEach((event: Event, index) => {
        if (joinableIndex < joinable.length) {
          if (
            event.duration.end <= joinable[joinableIndex].duration.start &&
            (index + 1 == itinerary.length ||
              itinerary[index + 1].duration.start >=
                joinable[joinableIndex].duration.end)
          ) {
            joinableEvents = addEventToList(
              joinableEvents,
              joinable[joinableIndex]
            );
            joinableIndex++;
          } else if (
            index === 0 &&
            joinable[joinableIndex].duration.end <= event.duration.start
          ) {
            joinableEvents = addEventToList(
              joinableEvents,
              joinable[joinableIndex]
            );
            joinableIndex++;
          } else {
            joinableIndex++;
          }
        }

        userEvents = addEventToList(userEvents, event);
      });

      while (joinableIndex < joinable.length) {
        joinableEvents = addEventToList(
          joinableEvents,
          joinable[joinableIndex]
        );
        joinableIndex++;
      }
    }

    if (response.ok) {
      return { userEvents, joinableEvents };
    }
    return null;
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

  // TODO: Allow a user to delete an activity widget for the trip.
  async function deleteActivityWidget(uid: string) {}

  // TODO: Allow a user to delete an activity widget for the trip.
  async function createActivityWidget() {}

  // TODO: Allow a user to create an availabillity widget for the trip.
  async function createAvailabillityWidget() {}

  // TODO: Allow a user to delete an availabillity widget for the trip
  async function deleteAvailabillityWidget() {}

  async function createEvent(event: Event, callback: (response: Response) => void) {
    const options = createFetchRequestOptions(JSON.stringify(trip), 'POST');
    const response = await fetch(`${API_URL}/trip/${trip.uid}/event`, options);

    if (response.ok) {
      callback({ isSuccess: response.ok, result: response.json() });
      setTrip({
        ...trip,
        joinableEvents: Array.from(addEventToList(trip.joinableEvents, event)),
      });
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() });
    }
  }

  async function modifyTrip(details: TripDetails, callback: (response: Response) => void) {
    const options = createFetchRequestOptions(JSON.stringify(details), 'PUT');
    const response = await fetch(`${API_URL}/trip/${trip.uid}/modify`, options);

    if (response.ok) {
      callback({ isSuccess: response.ok, result: response.json() });
      setTrip({
        ...trip,
        destination: details.destination,
        duration: details.duration
      });
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() });
    }
  }

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
        createEvent,
        modifyTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
