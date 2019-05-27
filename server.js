const fastify = require('fastify')({ logger: { level: 'error' }})
const Next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

fastify.register((fastify, opts, next) => {
  const app = Next({ dev })
  app
    .prepare()
    .then(() => {
      if (dev) {
        fastify.get('/_next/*', (request, reply) => app.handleRequest(request.req, reply.res).then(() => {
          reply.sent = true
        }))
      }

      // Handler for Post's requests
      fastify.get('/p/:id', (request, reply) => {
        const params = { title: request.params.id }
        return app.render(request.req, reply.res, '/post', params).then(() => {
          reply.sent = true
        })
      })

      // Handler for all requests
      fastify.get('/*', (request, reply) => app.handleRequest(request.req, reply.res).then(() => {
        reply.sent = true
      }))

      // Handler for NotFound requests
      fastify.setNotFoundHandler((request, reply) => app.render404(request.req, reply.res).then(() => {
        reply.sent = true
      }))

      next()
    }).catch(err => next(err))
})

fastify.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on 127.0.0.1:${port}`)
})