import mongoose from 'mongoose'
import IEvent from '../interfaces/event.interface'

const Schema = mongoose.Schema

const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        default: "",
        trim: true,
        required: true
    },
    description: {
        type: String,
        default: "",
        trim: true,
        required: true
    },
    organiser: {
        type: String,
        default: "",
        trim: true,
        required: true
    },
    participants: {
        type: String,
        default: "",
        trim: true,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room'
    },
    event_from: {
        type: Date,
        default: Date.now,
        required: true
    },
    event_to: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Event: mongoose.Model<IEvent> = mongoose.model('Event', EventSchema)
export default Event