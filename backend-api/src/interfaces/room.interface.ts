import Document from "mongoose";

interface IRoom extends Document {
    roomId: number
    name: string
    description: string
    isBooked: boolean
    booked_from: Date
    booked_to: Date
    created_at: Date
    updated_at: Date
}

export default IRoom