import express from 'express'
import Room from '../models/room.model'

const router = express.Router()

// Get all Rooms in db.
router.get('/room', async (request: express.Request, response: express.Response) => {
    console.log('Get All Rooms')
    try {
        const room = await Room.find()
        if (room != null && room.length > 0) {
            response.send({ message: 'Room Found', status: 'success', result: room })
        } else {
            return response.status(404).send({ message: 'Room Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Room Not Found', status: 'error', result: exception })
    }
})

// Get all free Rooms in db.
router.get('/room/free', async (request: express.Request, response: express.Response) => {
    console.log('Get Free Rooms')
    try {
        const room = await Room.find({ isBooked: false })
        if (room != null && room.length > 0) {
            response.send({ message: 'Room Found', status: 'success', result: room })
        } else {
            return response.status(404).send({ message: 'Room Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Room Not Found', status: 'error', result: exception })
    }
})

// Get a Room by Id.
router.get('/room/:id', async (request: express.Request, response: express.Response) => {
    console.log('Get Room by ID')
    const _id = request.params.id
    try {
        const room = await Room.findOne({ _id: _id })
        if (room != null) {
            response.send({ message: 'Room Found With Id: ' + _id, status: 'success', result: room })
        } else {
            return response.status(404).send({ message: 'Room Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Room Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Delete a Room by Id.
router.delete('/room/:id', async (request: express.Request, response: express.Response) => {
    console.log('Delete Room')
    const _id = request.params.id
    try {
        const room = await Room.findOneAndDelete({ _id: _id })
        if (room != null) {
            response.send({ message: 'Room Deleted With Id: ' + _id, status: 'success', result: room })
        } else {
            return response.status(404).send({ message: 'Room Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Room Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Update a Room by Id.
router.put('/room/:id', async (request: express.Request, response: express.Response) => {
    console.log('Update Room')
    const _id = request.params.id
    try {
        var roomToUpdate = await Room.findOne({ _id: _id })
        if (request.body.booked_from == null || request.body.booked_from == '' || request.body.booked_from == undefined) {
            request.body.booked_from = roomToUpdate.booked_from
        }
        if (request.body.booked_to == null || request.body.booked_to == '' || request.body.booked_to == undefined) {
            request.body.booked_to = roomToUpdate.booked_to
        }
        const room = await Room.findOneAndUpdate(
            { _id: _id },
            {
                roomId: request.body.roomId,
                name: request.body.name,
                description: request.body.description,
                isBooked: request.body.isBooked,
                booked_from: request.body.booked_from,
                booked_to: request.body.booked_to
            },
            { new: true }
        )
        if (room != null) {
            response.send({ message: 'Room Updated With Id: ' + _id, status: 'success', result: room })
        } else {
            return response.status(404).send({ message: 'Room Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Room Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Save a Room.
router.post('/room', async (request: express.Request, response: express.Response) => {
    console.log('Save Room')
    try {
        if (request.body.booked_from == null || request.body.booked_from == '' || request.body.booked_from == undefined) {
            request.body.booked_from = null
        }
        if (request.body.booked_to == null || request.body.booked_to == '' || request.body.booked_to == undefined) {
            request.body.booked_to = null
        }
        const room = new Room({
            roomId: request.body.roomId,
            name: request.body.name,
            description: request.body.description,
            isBooked: request.body.isBooked,
            booked_from: request.body.booked_from,
            booked_to: request.body.booked_to
        })
        await room.save()
        return response.status(201).send({ message: 'New Room Created', status: 'success', result: room })
    } catch (exception) {
        console.log(exception)
        return response.status(400).send({ message: 'Room Not Created', status: 'error', result: exception })
    }
})

export default router
