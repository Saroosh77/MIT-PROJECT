import express from 'express'
import User from '../models/user.model'

const router = express.Router()

// Get all Users in db.
router.get('/user', async (request: express.Request, response: express.Response) => {
    console.log('Get All Users')
    try {
        const user = await User.find()
        if (user != null && user.length > 0) {
            response.send({ message: 'User Found', status: 'success', result: user })
        } else {
            return response.status(404).send({ message: 'User Not Found', status: 'failure', result: user })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'User Not Found', status: 'error', result: exception })
    }
})

// Get a User by Id.
router.get('/user/:id', async (request: express.Request, response: express.Response) => {
    console.log('Get User by ID')
    const _id = request.params.id
    try {
        const user = await User.findOne({ _id: _id })
        if (user != null) {
            response.send({ message: 'User Found With Id: ' + _id, status: 'success', result: user })
        } else {
            return response.status(404).send({ message: 'User Not Found With Id: ' + _id, status: 'failiure', result: user })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'User Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Delete a User by Id.
router.delete('/user/:id', async (request: express.Request, response: express.Response) => {
    console.log('Delete User')
    const _id = request.params.id
    try {
        const user = await User.findOneAndDelete({ _id: _id })
        if (user != null) {
            response.send({ message: 'User Deleted With Id: ' + _id, status: 'success', result: user })
        } else {
            return response.status(404).send({ message: 'User Not Found With Id: ' + _id, status: 'failiure', result: user })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'User Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Update a User by Id.
router.put('/user/:id', async (request: express.Request, response: express.Response) => {
    console.log('Update User')
    const _id = request.params.id
    try {
        const user = await User.findOneAndUpdate(
            { _id: _id },
            { 
                name: request.body.name, 
                email: request.body.email
            },
            { new: true }
        )
        if (user != null) {
            response.send({ message: 'User Updated With Id: ' + _id, status: 'success', result: user })
        } else {
            return response.status(404).send({ message: 'User Not Found With Id: ' + _id, status: 'failiure', result: user })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'User Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Save a User.
router.post('/user', async (request: express.Request, response: express.Response) => {
    console.log('Save User')
    try {
        const user = new User({
            name: request.body.name, 
            email: request.body.email,
            password: request.body.password,
            isAdmin: ((await User.find()).length == 0) ? true : false
        })
        await user.save()
        return response.status(201).send({ message: 'New User Created', status: 'success', result: user })
    } catch (exception) {
        console.log(exception)
        return response.status(400).send({ message: 'User Not Created', status: 'error', result: exception })
    }
})

export default router
