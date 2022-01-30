import mongoose from 'mongoose'
import IInternational from '../interfaces/international.interface'

const Schema = mongoose.Schema

const InternationalSchema = new Schema<IInternational>({
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
    link: {
        type: String,
        default: "",
        trim: true,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const International: mongoose.Model<IInternational> = mongoose.model('International', InternationalSchema)
export default International
