import * as restify from 'restify'
import City from './city.js'
import Cache from './cache.js'
import respond from './weather-respond.js'
import openApi from './open-api-respond.js'

const server = restify.createServer()

Cache.on('del', (key: string) => Cache.set(key, new City(key)))

server.use(restify.plugins.queryParser())
server.on('close', () => Cache.close())

server.get('/weather/:name', respond)
server.get('/openapi', openApi)

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
})
