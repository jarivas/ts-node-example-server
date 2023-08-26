import * as restify from 'restify'
import * as errs from 'restify-errors'
import NodeCache from 'node-cache'
import City from './city.js';

const server = restify.createServer()
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 100 })

myCache.on('del', (key: string) => myCache.set(key, new City(key)))

server.use(restify.plugins.queryParser())

server.get('/weather/:name', respond);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
})

server.on('close', () => myCache.close())

function respond(req: restify.Request, res: restify.Response, next: restify.Next) {
  const cityName = String(req.params?.name)// eslint-disable-line

  if (!City.isValid(cityName)) {
    return next(new errs.NotFoundError('City not found'))
  }

  if (myCache.has(cityName)) {
    res.send(myCache.get(cityName))
    return next(false)
  }

  const city = new City(cityName)

  myCache.set(cityName, city)

  res.send(city)

  next()
}