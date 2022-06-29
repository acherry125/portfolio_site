// CommonJs
const fastify = require('fastify')({
    logger: true
})

const path = require('path');

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/'
  })

fastify.listen({ port: 8000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})