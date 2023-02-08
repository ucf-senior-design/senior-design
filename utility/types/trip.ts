export type Trip = {
  uid: string;
  attendees: Array<string>;
  itinerary: Array<Array<Event>>;
  polls: Array<Poll>;
  duration: Duration;
  weather?: Weather;
};

// TODO: Determine what is necessary
export type Weather = {
  zipCode: string;
};

export type Duration = {
  start: Date;
  end: Date;
};
export type Event = {
  uid: string;
  title: string;
  attendees: Array<string>;
  duration: Duration;
  location: string;
  description: string;
};

export type PollOption = {
  value: string;
  voters: Array<string>;
};
export type Poll = {
  owner: string;
  uid: string;
  title: string;
  options: Array<PollOption>;
};

export type SuggestionOption = {
  owner: string;
  option: string;
  upVotes: Array<string>;
  downVotes: Array<string>;
};
export type SuggestionWidget = {
  owner: string;
  uid: string;
  title: string;
  suggestions: Array<SuggestionOption>;
};
