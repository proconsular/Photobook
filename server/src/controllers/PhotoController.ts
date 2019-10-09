import { Controller, Post, Middleware, Get, Delete, Put } from '@overnightjs/core'

import { Repository } from 'typeorm'

import { Photo } from '../entity/Photo'
import { Request, Response } from 'express'

import { upload } from '../server'
import { copyFile } from 'fs'
import { join } from 'path'
import { User } from '../entity/User'

@Controller('api/photos')
export class PhotoController {
    private repo: Repository<Photo>

    constructor(repo: Repository<Photo>) {
        this.repo = repo
    }

    @Post()
    @Middleware(upload.single('file'))
    public async post(req: Request, res: Response) {
        try {
            const body = {
                name: req.body.name,
                description: req.body.description,
                user: req.body.owner,
            }
            const file = req.file
            const photo = await this.repo.create(body)
            await this.repo.save(photo)
            const url = `photos/${photo.id}.${file.originalname.split('.')[1]}`
            copyFile(file.path, url, async (err) => {
                if (err) {
                    throw err
                }
                photo.url = url
                await this.repo.save(photo)
                res.status(200).json(photo)
            })
        } catch(err) {
            res.status(400).json(err.message)
        }
    }

    @Put(':id')
    public async put(req: Request, res: Response) {
        try {
            const photo = await this.repo.findOneOrFail(req.params.id)
            const newPhoto = {
                ...photo,
                ...req.body,
            }
            await this.repo.save(newPhoto)
            res.status(200).json(newPhoto)
        } catch (err) {
            res.status(400).json(err.message)
        }
    }

    @Get(':id')
    public async get(req: Request, res: Response) {
        try {
            const photo = await this.repo.findOneOrFail(req.params.id)
            if (req.query.type && req.query.type === 'view') {
                res.status(200).sendFile(join(__dirname, '..', '..', photo.url))
            } else {
                res.status(200).json(photo)
            }
        } catch(err) {
            res.status(400).json(err.message)
        }
    }

    @Get()
    public async getAll(req: Request, res: Response) {
        try {
            if (req.query.offset && req.query.count) {
                const photos = await this.repo
                    .createQueryBuilder('photo')
                    .leftJoinAndSelect('photo.user', 'user')
                    .select('photo')
                    .addSelect('user.id')
                    .addSelect('user.username')
                    .offset(req.query.offset)
                    .limit(req.query.count)
                    .getMany()
                res.status(200).json(photos)
            } else {
                throw new Error('Wrong query.')
            }
        } catch(err) {
            res.status(400).json(err.message)
        }
    }

    @Delete(':id')
    public async remove(req: Request, res: Response) {
        try {
            if (req.params.id) {
                await this.repo.delete(req.params.id)
                res.status(200).json()
            }
        } catch(err) {
            res.status(400).json(err.message)
        }
    }
}
