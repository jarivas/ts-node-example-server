import * as restify from 'restify'
import * as fs from 'fs'

export default function openApi(req: restify.Request, res: restify.Response, next: restify.Next) {
    fs.readFile('/app/open-api.json', 'utf8', (err, data) => {
        if (err) {
            return next(err)
        }

        res.send(JSON.parse(data))

        next()
    })
}