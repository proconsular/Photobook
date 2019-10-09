import { Controller, Post, Put, Delete } from '@overnightjs/core'

import { Repository } from 'typeorm'
import { User } from '../entity/User'
import { Request, Response } from 'express'

import * as bcrypt from 'bcrypt'
import * as jsonwebtoken from 'jsonwebtoken'

@Controller('api/admission')
export class AdmissionController {
    private users: Repository<User>

    constructor(users: Repository<User>) {
        this.users = users
    }

    @Post()
    public async signup(req: Request, res: Response) {
        try {
            const hash = await bcrypt.hash(req.body.password, 10)
            const user = await this.users.create({username: req.body.username, password: hash})
            await this.users.save(user)
            res.status(200).json()
        } catch(err) {
            res.status(400).json(err.message)
        }
    }

    @Put()
    public async signin(req: Request, res: Response) {
        try {
            const user = await this.users.findOneOrFail({where: {username: req.body.username}})
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                throw new Error('Password mismatch.')
            }
            const token = jsonwebtoken.sign({
                username: user.username,
                password: user.password,
            }, '123', {expiresIn: '4h'})
            user.token = token
            user.online = true
            await this.users.save(user)
            res.status(200).json({id: user.id, username: user.username, token})
        } catch(err) {
            res.status(400).json(err.message)
        }
    }

    @Delete(':id')
    public async signout(req: Request, res: Response) {
        try {
            const user = await this.users.findOneOrFail(req.params.id)
            user.online = false
            await this.users.save(user)
            res.status(200).json()
        } catch(err) {
            res.status(400).json(err.message)
        }
    }
}