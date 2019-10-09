import { Controller, Get, Post, ClassMiddleware } from '@overnightjs/core'

import { Repository } from 'typeorm'

import { User } from '../entity/User'
import { Response, Request } from 'express'

import { security } from '../middleware/security'

@Controller('api/users')
@ClassMiddleware(security.middleware)
export class UserController {
    private repo: Repository<User>

    constructor(repo: Repository<User>) {
        this.repo = repo
    }

    @Get()
    public async get(req: Request, res: Response) {
        try {
            const users = await this.repo.find()
            res.status(200).json(users)
        } catch(err) {
            res.status(400).json(err.message)
        }
    }

    @Post()
    public async post(req: Request, res: Response) {
        try {
            const user = await this.repo.create(req.body)
            await this.repo.save(user)
            res.status(200).json(user)
        } catch(err) {
            res.status(400).json(err.message)
        }
    }
}