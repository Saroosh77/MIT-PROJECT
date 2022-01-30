import { Room } from './room';

export interface Event {
  _id: string
  title: string
  description: string
  organiser: string
  participants: string
  room: Room
  event_from: Date
  event_to: Date
  created_at: Date
  updated_at: Date
}

export interface CreateEvent {
  title: string
  description: string
  organiser: string
  participants: string
  room: Room
  event_from: Date
  event_to: Date
}
