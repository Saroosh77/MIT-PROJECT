import express from 'express'
import Event from '../models/event.model'
import Room from '../models/room.model'

const router = express.Router()

// Get all Events in db.
router.get('/event', async (request: express.Request, response: express.Response) => {
    console.log('Get All Events')
    try {
        const event = await Event.find()
        if(event != null && event.length > 0) {
            response.send({ message: 'Event Found', status: 'success', result: event })
        } else {
            return response.status(404).send({ message: 'Event Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Event Not Found', status: 'error', result: exception })
    }
})

// Get an Event by Id.
router.get('/event/:id', async (request: express.Request, response: express.Response) => {
    console.log('Get Event bz ID')
    const _id = request.params.id
    try {
        const event = await Event.findOne({ _id: _id })
        if (event != null) {
            response.send({ message: 'Event Found With Id: ' + _id, status: 'success', result: event })
        } else {
            return response.status(404).send({ message: 'Event Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Event Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Delete an Event by Id.
router.delete('/event/:id', async (request: express.Request, response: express.Response) => {
    console.log('Delete Event')
    const _id = request.params.id
    try {
        const event = await Event.findOneAndDelete({ _id: _id })
        if (event != null) {
            response.send({ message: 'Event Deleted With Id: ' + _id, status: 'success', result: event })
        } else {
            return response.status(404).send({ message: 'Event Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Event Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Update an Event by Id.
router.put('/event/:id', async (request: express.Request, response: express.Response) => {
    console.log('Update Event')
    const _id = request.params.id
    try {
        const eventToUpdate = await Event.findOne({ _id: _id })
        if (request.body.event_from == null || request.body.event_from == '' || request.body.event_from == undefined) {
            request.body.event_from = eventToUpdate.event_from
        }
        if (request.body.event_to == null || request.body.event_to == '' || request.body.event_to == undefined) {
            request.body.event_to = eventToUpdate.event_to
        }
        if (request.body.room == null || request.body.room == '' || request.body.room == undefined) {
            request.body.room = eventToUpdate.room
        }
        const event = await Event.findOneAndUpdate(
            { _id: _id },
            {
                title: request.body.title,
                description: request.body.description,
                organiser: request.body.organiser,
                participants: request.body.participants,
                room: request.body.room,
                event_from: request.body.event_from,
                event_to: request.body.event_to
            },
            { new: true }
        )
        if (event != null) {
            response.send({ message: 'Event Updated With Id: ' + _id, status: 'success', result: event })
        } else {
            return response.status(404).send({ message: 'Event Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Event Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Save an Event.
router.post('/event', async (request: express.Request, response: express.Response) => {
    console.log('Save Event')
    try {
        var defaultRoom
        if (request.body.event_from == null || request.body.event_from == '' || request.body.event_from == undefined) {
            request.body.event_from = Date.now()
        }
        if (request.body.event_to == null || request.body.event_to == '' || request.body.event_to == undefined) {
            request.body.event_to = Date.now()
        }
        
        if (request.body.room == null || request.body.room == '' || request.body.room == undefined) {
            let room = await Room.find()
            if( room!= null && room.length == 0) {
                defaultRoom = new Room({
                    roomId: 0,
                    name: "Auditorium",
                    description: "Auditorium Description",
                    isBooked: true,
                    booked_from: request.body.event_from,
                    booked_to: request.body.event_to
                })
                await defaultRoom.save()
                request.body.room = defaultRoom
            } else {
                room = await Room.find({ isBooked: false })
                if(room != null && room.length > 0) {
                    room[0]['isBooked'] = true
                    room[0]['booked_from'] = request.body.event_from
                    room[0]['booked_to'] = request.body.event_to
                    defaultRoom = await Room.findOneAndUpdate(
                        { _id: room[0]['_id'] },
                        {
                            roomId: room[0]['roomId'],
                            name: room[0]['name'],
                            description: room[0]['description'],
                            isBooked: room[0]['isBooked'],
                            booked_from: room[0]['booked_from'],
                            booked_to: room[0]['booked_to']
                        },
                        { new: true }
                    )
                    request.body.room = defaultRoom
                    if (defaultRoom != null) {
                        console.log("Room Updated With Id: " + defaultRoom['_id'])
                        // response.send({ message: 'Room Updated With Id: ' + _id, status: 'success', result: room })
                    } else {
                        return response.status(404).send({ message: 'Room Not Found With Id: ' + defaultRoom['_id'], status: 'failiure', result: {} })
                    }
                } else {
                    return response.status(404).send({ message: 'No Free Room Available.', status: 'error', result: room })
                }
            } 
        }
        const event = new Event({
            title: request.body.title,
            description: request.body.description,
            organiser: request.body.organiser,
            participants: request.body.participants,
            room: request.body.room,
            event_from: request.body.event_from,
            event_to: request.body.event_to
        })
        await event.save()
        return response.status(201).send({ message: 'New Event Created', status: 'success', result: event })
        
    } catch (exception) {
        console.log(exception)
        return response.status(400).send({ message: 'Event Not Created', status: 'error', result: exception })
    }
})

export default router
