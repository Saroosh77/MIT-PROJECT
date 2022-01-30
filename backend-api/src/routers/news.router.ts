import express from 'express'
import News from '../models/news.model'

const router = express.Router()

// Get all News in db.
router.get('/news', async (request: express.Request, response: express.Response) => {
    console.log('Get All News')
    try {
        const news = await News.find()
        console.log(news)
        if (news != null && news.length > 0) {
            response.send({ message: 'News Found', status: 'success', result: news })
        } else {
            return response.status(404).send({ message: 'News Not Found', status: 'failure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'News Not Found', status: 'error', result: exception })
    }
})

// Get a News by Id.
router.get('/news/:id', async (request: express.Request, response: express.Response) => {
    console.log('Get News by ID')
    const _id = request.params.id
    try {
        const news = await News.findOne({ _id: _id })
        if (news != null) {
            response.send({ message: 'News Found With Id: ' + _id, status: 'success', result: news })
        } else {
            return response.status(404).send({ message: 'News Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'News Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Delete a News by Id.
router.delete('/news/:id', async (request: express.Request, response: express.Response) => {
    console.log('Delete News')
    const _id = request.params.id
    try {
        const news = await News.findOneAndDelete({ _id: _id })
        if (news != null) {
            response.send({ message: 'News Deleted With Id: ' + _id, status: 'success', result: news })
        } else {
            return response.status(404).send({ message: 'News Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'News Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Update a News by Id.
router.put('/news/:id', async (request: express.Request, response: express.Response) => {
    console.log('Update News')
    const _id = request.params.id
    try {
        const news = await News.findOneAndUpdate(
            { _id: _id },
            { 
                title: request.body.title, 
                description: request.body.description, 
                link: request.body.link 
            },
            { new: true }
        )
        if (news != null) {
            response.send({ message: 'News Updated With Id: ' + _id, status: 'success', result: news })
        } else {
            return response.status(404).send({ message: 'News Not Found With Id: ' + _id, status: 'failiure', result: {} })
        }
    } catch (exception) {
        console.log(exception)
        return response.status(500).send({ message: 'News Not Found With Id: ' + _id, status: 'error', result: exception })
    }
})

// Save a News.
router.post('/news', async (request: express.Request, response: express.Response) => {
    console.log('Save News')
    try {
        const news = new News({
            title: request.body.title,
            description: request.body.description, 
            link: request.body.link
        })
        await news.save()
        return response.status(201).send({ message: 'New News Created', status: 'success', result: news })
    } catch (exception) {
        console.log(exception)
        return response.status(400).send({ message: 'News Not Created', status: 'error', result: exception })
    }
})

export default router
