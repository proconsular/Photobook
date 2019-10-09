import { Repository } from 'typeorm'
import { Response, Request, NextFunction, RequestHandler } from 'express'
import * as jsonwebtoken from 'jsonwebtoken'

import { User } from '../entity/User'

class Security {
    public users: Repository<User>

    public middleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization!.split(' ')[1]
            const user = await this.users.findOneOrFail({token})
            const payload = jsonwebtoken.verify(token, '123') as any
            const valid =  payload.username === user.username && payload.password === user.password
            if (user.online && valid) {
                next()
            } else {
                res.status(400).json({message: 'Unauthorized.'})
            }
        } catch (err) {
            res.status(400).json({message: 'Unauthorized.'})
        }
    }
}

export const security = new Security()
