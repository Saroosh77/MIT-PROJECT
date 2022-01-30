import Document from "mongoose";
import IRoom from './room.interface'

interface IEvent extends Document {
    title: string
    description: string
    organiser: string
    participants: string
    room: IRoom
    event_from: Date
    event_to: Date
    created_at: Date
    updated_at: Date
}

export default IEvent