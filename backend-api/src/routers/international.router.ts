import express from 'express'
import International from '../models/international.model'

const router = express.Router()

// Get all International in db.
router.get('/international', async (request: express.Request, response: express.Response) => {
    console.log('Get All International')
    try {
        const international = await International.find()
        if (international != null && international.length > 0) {
            response.send({ message: 'International Found', status: 'success', result: international })
        } else {
            return response.status(404).send({ message: 'International Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'International Not Found', status: 'error', result: exception })
    }
})

// Get a International by Id.
router.get('/international/:id', async (request: express.Request, response: express.Response) => {
    console.log('Get International by ID')
    const _id = request.params.id
    try {
        const international = await International.findOne({ _id: _id })
        if (international != null) {
            response.send({ message: 'International Found With Id: ' + _id, status: 'success', result: international })
        } else {
            return response.status(404).send({ message: 'International Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'International Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Delete a International by Id.
router.delete('/international/:id', async (request: express.Request, response: express.Response) => {
    console.log('Delete International')
    const _id = request.params.id
    try {
        const international = await International.findOneAndDelete({ _id: _id })
        if (international != null) {
            response.send({ message: 'International Deleted With Id: ' + _id, status: 'success', result: international })
        } else {
            return response.status(404).send({ message: 'International Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'International Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Update a International by Id.
router.put('/international/:id', async (request: express.Request, response: express.Response) => {
    console.log('Update International')
    const _id = request.params.id
    try {
        const international = await International.findOneAndUpdate(
            { _id: _id },
            { 
                title: request.body.title, 
                description: request.body.description, 
                link: request.body.link 
            },
            { new: true }
        )
        if (international != null) {
            response.send({ message: 'International Updated With Id: ' + _id, status: 'success', result: international })
        } else {
            return response.status(404).send({ message: 'International Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'International Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Save a International.
router.post('/international', async (request: express.Request, response: express.Response) => {
    console.log('Save International')
    try {
        const international = new International({
            title: request.body.title,
            description: request.body.description, 
            link: request.body.link
        })
        await international.save()
        return response.status(201).send({ message: 'New International Created', status: 'success', result: international })
    } catch (exception) {
        console.log(exception)
        return response.status(400).send({ message: 'International Not Created', status: 'error', result: exception })
    }
})

export default router
