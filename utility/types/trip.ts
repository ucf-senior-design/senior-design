export type Trip = {
  uid: string;
  attendees: Array<string>;
  itinerary: Array<Array<Event>>;
  polls: Array<Poll>;
  activtityPref: Array<any>;
  duration: Duration;
  weather?: Weather;
};

export type ActivityPrefField =
  | 'SPORTS'
  | 'NATURE'
  | 'SIGHTSEEING'
  | 'LOWPRICE'
  | 'MEDPRICE'
  | 'HIGHPRICE'
  | 'VERYHIGHPRICE';

export type ActivityPref = {
  title: string;
  sports: Array<string>;
  nature: Array<string>;
  sightseeing: Array<string>;
  lowPrice: Array<string>; // < $500
  medPrice: Array<string>; // $500 - $1000
  highPrice: Array<string>; // $1000 - $2500
  veryHighPrice: Array<string>; // > $2500
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
