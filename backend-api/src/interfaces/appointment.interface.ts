import Document from "mongoose";

interface IAppointment extends Document {
    name: string
    email: string
    description: string
    isBooked: Boolean
    booked_from: Date
    booked_to: Date
    created_at: Date
    updated_at: Date
}

export default IAppointment