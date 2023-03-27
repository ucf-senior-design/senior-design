export interface Trip {
  uid: string
  attendees: Set<string>
  duration: Duration
  destination: string
  photoURL: string
  layout: Array<StoredLocation>
}
export type StoredLocation = {
  key: string
  size: number
}

export type WidgetType = "suggestion" | "day" | "poll"

export interface Widget {
  key: string
}
export type UserAvailabillity = {
  uid: string
  dates: Array<Duration>
}

export type Availabillity = {
  owner: string
  uid: string
  title: string
  availabillities: Map<string, UserAvailabillity>
}

export type ActivityPrefField =
  | "SPORTS"
  | "NATURE"
  | "SIGHTSEEING"
  | "LOWPRICE"
  | "MEDPRICE"
  | "HIGHPRICE"
  | "VERYHIGHPRICE"

export type ActivityPref = {
  title: string
  sports: Array<string>
  nature: Array<string>
  sightseeing: Array<string>
  lowPrice: Array<string> // < $500
  medPrice: Array<string> // $500 - $1000
  highPrice: Array<string> // $1000 - $2500
  veryHighPrice: Array<string> // > $2500
}
export type Duration = {
  start: Date
  end: Date
}

// TODO: Determine what is necessary
export type Weather = {
  zipCode: string
}

export interface CreatedEvent {
  title: string
  attendees: Array<string>
  duration: Duration
  location: string
  description: string
}
export interface Event extends CreatedEvent {
  uid: string
}

export type PollOption = {
  value: string
  voters: Array<string>
}
export type Poll = {
  owner: string
  uid: string
  title: string
  options: Array<PollOption>
}

export interface SuggestionOption {
  uid: string
  owner: string
  option: string
  likes: Set<string>
}
export interface SuggestionWidget {
  owner: string
  uid: string
  title: string
  suggestions: Map<string, SuggestionOption>
}
