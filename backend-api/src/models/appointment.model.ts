import mongoose from 'mongoose'
import IAppointment from '../interfaces/appointment.interface'

const Schema = mongoose.Schema

const AppointmentSchema = new Schema<IAppointment>({
    name: {
		type: String,
        default: "",
        trim: true,
        required: true
	},
	email: {
		type: String,
        default: "",
        trim: true,
        required: true,
        lowercase: true,
		unique: true,
		match: [/.+\@.+\..+/, 'Please fill a valid email address'],
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

const Appointment: mongoose.Model<IAppointment> = mongoose.model('Appointment', AppointmentSchema)
export default Appointment
