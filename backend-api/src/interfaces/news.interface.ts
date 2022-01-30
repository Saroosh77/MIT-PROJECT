import Document from "mongoose"

interface INews extends Document {
    title: string
    description: string
    link: string
    created_at: Date
    updated_at: Date
}

export default INews