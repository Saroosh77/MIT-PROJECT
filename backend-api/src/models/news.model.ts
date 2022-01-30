import mongoose from 'mongoose'
import INews from '../interfaces/news.interface'

const Schema = mongoose.Schema

const NewsSchema = new Schema<INews>({
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
        default: "https://www.th-deg.de/en",
        trim: true,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const News: mongoose.Model<INews> = mongoose.model('News', NewsSchema)
export default News
