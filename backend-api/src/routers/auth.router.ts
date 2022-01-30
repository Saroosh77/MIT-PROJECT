import express from 'express'
import User from '../models/user.model'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import IToken from '../interfaces/token.interface'

const router = express.Router()

const requireSignin = expressJwt({ secret: "saroosh", userProperty: 'auth', algorithms: ['sha1', 'RS256', 'HS256'] })

// Login a User.
router.post('/auth/login', async (request: express.Request, response: express.Response) => {
    console.log('Login')
    try {
        const user = await User.findOne({ email: request.body.email })
        if (user != null) {
            if (!user.authenticate(request.body.password)) {
                return response.status(401).send({ message: 'Authentication Failed', status: 'failure', result: {} })
            }
            const token = jwt.sign({ _id: user._id }, "saroosh")
            var expiryDate = new Date(Number(new Date()) + 999)
            response.cookie("t", token, { expires: expiryDate })
            return response.status(201).send({ message: 'Login Successful', status: 'success', result: { token, user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } } })
        } else {
            return response.status(404).send({ message: 'User Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'User Not Found', status: 'error', result: exception })
    }
})

// Logout a User.
router.get('/auth/logout', async (request: express.Request, response: express.Response) => {
    console.log('Logout')
    try {
        response.clearCookie("t")
        return response.status(201).send({ message: 'Logout Successful', status: 'success' })
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'User Not Found', status: 'error', result: exception })
    }
})

// Loggedin User Profile.
router.route('/auth/user').get(requireSignin, async (request: express.Request, response: express.Response) => {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
        if (token != null) {
            const userIdFromToken = await jwt.verify(token, "saroosh") as IToken
            var _id = userIdFromToken._id
            const user = await User.findOne({ _id: _id })
            if (user != null) {
                response.send({ message: 'User Found With Id: ' + _id, status: 'success', result: user })
            } else {
                return response.status(404).send({ message: 'User Not Found With Id: ' + _id, status: 'failiure', result: user })
            }
        } else {
            return response.status(401).json({ message: 'Token Cannot be Null', status: 'failed', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'User Not Found', status: 'error', result: exception })
    }
})

export default router