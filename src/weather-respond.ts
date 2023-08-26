import * as restify from 'restify'
import * as errs from 'restify-errors'
import Cache from './cache.js'
import City from './city.js'

export default function respond(req: restify.Request, res: restify.Response, next: restify.Next) {
    const cityName = String(req.params?.name)// eslint-disable-line

    if (!City.isValid(cityName)) {
        return next(new errs.NotFoundError('City not found'))
    }

    if (Cache.has(cityName)) {
        res.send(Cache.get(cityName))
        return next(false)
    }

    const city = new City(cityName)

    Cache.set(cityName, city)

    res.send(city)

    next()
}