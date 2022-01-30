import mongoose from 'mongoose'
import IRoom from '../interfaces/room.interface'

const Schema = mongoose.Schema

const RoomSchema = new Schema<IRoom>({
    roomId: {
        type: Number,
        default: 0,
        required: true,
        unique: true,
        min: 0
    },
    name: {
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
    isBooked: {
        type: Boolean,
        default: false,
        trim: true,
        required: true
    },
    booked_from: {
        type: Date
        // default: Date.now,
        // required: true
    },
    booked_to: {
        type: Date
        // default: Date.now,
        // required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Room: mongoose.Model<IRoom> = mongoose.model('Room', RoomSchema)
export default Room
