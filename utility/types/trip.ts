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
  attendees: Array<string>;
  duration: Duration;
  location: string;
  description: string;
};

export type Poll = {
  uid: string;
  options: Array<{
    value: string;
    voters: Array<string>;
  }>;
  description: string;
};
