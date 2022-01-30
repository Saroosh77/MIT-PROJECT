import mongoose from 'mongoose'
import crypto from 'crypto'
import IUser from '../interfaces/user.interface'

const Schema = mongoose.Schema

const UserSchema = new Schema<IUser>({
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
    hashed_password: {
		type: String,
        required: true
	},
    salt: {
		type: String,
        default: "",
        trim: true
	},
	isAdmin: {
        type: Boolean,
        default: false,
        trim: true,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

UserSchema.virtual('password')
.set(function (password: string) {
	this._password = password
	this.salt = this.makeSalt()
	this.hashed_password = this.encryptPassword(password)
})
.get(function () {
	return this._password
})

UserSchema.path('hashed_password').validate(function (v) {
	if (this._password && this._password.length < 6) {
		this.invalidate('password', 'Password must be at least 6 characters.')
	}
	if (this.isNew && !this._password) {
		this.invalidate('password', 'Password is required')
	}
}, null)

UserSchema.methods = {
	encryptPassword: function (password: string) {
		if (!password) return ''
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
		} catch (err) {
			return ''
		}
	},
	authenticate: function (plainText: string) {
		return this.encryptPassword(plainText) === this.hashed_password
	},
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + ''
	}
}

const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema)
export default User