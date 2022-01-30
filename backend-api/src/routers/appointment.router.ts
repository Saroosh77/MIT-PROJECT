import express from 'express'
import Appointment from '../models/appointment.model'

const router = express.Router()

// Get all appointments in db.
router.get('/appointment', async (request: express.Request, response: express.Response) => {
    console.log('All Appointments')
    try {
        const appointment = await Appointment.find()
        if (appointment != null && appointment.length > 0) {
            response.send({ message: 'Appointment Found', status: 'success', result: appointment })
        } else {
            return response.status(404).send({ message: 'Appointment Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Appointment Not Found', status: 'error', result: exception })
    }
})

// Get all free appointments in db.
router.get('/appointment/free', async (request: express.Request, response: express.Response) => {
    console.log('Free Appointments')
    try {
        const appointment = await Appointment.find({ isBooked: false })
        if (appointment != null && appointment.length > 0) {
            response.send({ message: 'Appointment Found', status: 'success', result: appointment })
        } else {
            return response.status(404).send({ message: 'Appointment Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Appointment Not Found', status: 'error', result: exception })
    }
})

// Get an Appointment by Id.
router.get('/appointment/:id', async (request: express.Request, response: express.Response) => {
    console.log('Appointment by ID')
    const _id = request.params.id
    try {
        const appointment = await Appointment.findOne({ _id: _id })
        if (appointment != null) {
            response.send({ message: 'Appointment Found With Id: ' + _id, status: 'success', result: appointment })
        } else {
            return response.status(404).send({ message: 'Appointment Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Appointment Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Delete an Appointment by Id.
router.delete('/appointment/:id', async (request: express.Request, response: express.Response) => {
    console.log('Delete Appointment')
    const _id = request.params.id
    try {
        const appointment = await Appointment.findOneAndDelete({ _id: _id })
        if (appointment != null) {
            response.send({ message: 'Appointment Deleted With Id: ' + _id, status: 'success', result: appointment })
        } else {
            return response.status(404).send({ message: 'Appointment Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Appointment Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Update an Appointment by Id.
router.put('/appointment/:id', async (request: express.Request, response: express.Response) => {
    console.log('Update Appointment')
    const _id = request.params.id
    try {
        var appointmentToUpdate = await Appointment.findOne({ _id: _id })
        if (request.body.booked_from == null || request.body.booked_from == '' || request.body.booked_from == undefined) {
            request.body.booked_from = appointmentToUpdate.booked_from
        }
        if (request.body.booked_to == null || request.body.booked_to == '' || request.body.booked_to == undefined) {
            request.body.booked_to = appointmentToUpdate.booked_to
        }
        const appointment = await Appointment.findOneAndUpdate(
            { _id: _id },
            {
                name: request.body.name,
                email: request.body.email,
                description: request.body.description,
                isBooked: request.body.isBooked,
                booked_from: request.body.booked_from,
                booked_to: request.body.booked_to
            },
            { new: true }
        )
        if (appointment != null) {
            response.send({ message: 'Appointment Updated With Id: ' + _id, status: 'success', result: appointment })
        } else {
            return response.status(404).send({ message: 'Appointment Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'Appointment Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Save an Appointment.
router.post('/appointment', async (request: express.Request, response: express.Response) => {
    console.log('Save Appointment')
    try {
        if (request.body.booked_from == null || request.body.booked_from == '' || request.body.booked_from == undefined) {
            request.body.booked_from = null
        }
        if (request.body.booked_to == null || request.body.booked_to == '' || request.body.booked_to == undefined) {
            request.body.booked_to = null
        }
        const appointment = new Appointment({
            name: request.body.name,
            email: request.body.email,
            description: request.body.description,
            isBooked: request.body.isBooked,
            booked_from: request.body.booked_from,
            booked_to: request.body.booked_to
        })
        await appointment.save()
        return response.status(201).send({ message: 'New Appointment Created', status: 'success', result: appointment })
    } catch (exception) {
        console.log(exception)
        return response.status(400).send({ message: 'Appointment Not Created', status: 'error', result: exception })
    }
})

export default router
