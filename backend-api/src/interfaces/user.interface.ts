import Document from "mongoose"

interface IUser extends Document {
    name: string
    email: string
    hashed_password: string
    salt: string
    isAdmin: Boolean
    created_at: Date
    updated_at: Date
    _password: string
    encryptPassword(password: string): string
    authenticate(plainText: string): boolean
    makeSalt(): number
}

export default IUser