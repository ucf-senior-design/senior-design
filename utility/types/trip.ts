export type Trip = {
  uid: string;
  attendees: Array<string>;
  duration: Duration;
  destination: string;
};

export type Duration = {
  start: Date;
  end: Date;
};

// TODO: Determine what is necessary
export type Weather = {
  zipCode: string;
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

export interface SuggestionOption {
  uid: string;
  owner: string;
  option: string;
  likes: Set<string>;
}
export interface SuggestionWidget {
  owner: string;
  uid: string;
  title: string;
  suggestions: Map<string, SuggestionOption>;
}
