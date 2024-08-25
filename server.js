import { fastify } from "fastify"

import { memory } from './database-memory.js'

const server = fastify()

const database = new memory()

// Criando um video.
server.post('/videos', (request, reply) => {

    const { title, description, duration } = request.body

    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()

})

server.get('/videos', (request) => {

    const search = request.query.search

    const videos = database.list(search)

    return videos

})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    const updated = database.update(videoId, { title, description, duration })

    if (updated) {
        return reply.status(204).send()
    } else {
        return reply.status(404).send({ message: 'Video not found' })
    }
})

server.delete('/videos/id:', () => {
    return "Hello World"
})

server.listen({
    port: 3333,
})