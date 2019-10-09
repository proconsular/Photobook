import * as bodyParser from 'body-parser';

import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

import * as multer from 'multer'
export const upload = multer({dest: 'uploads/'})

import { UserController } from './controllers/UserController'
import { AdmissionController } from './controllers/AdmissionController'
import { PhotoController } from './controllers/PhotoController'

import { security } from './middleware/security'
import { Photo } from './entity/Photo';

class AppServer extends Server {

    private readonly SERVER_STARTED = 'Server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        createConnection().then(async (connection) => {
            const users = connection.getRepository(User)
            const photos = connection.getRepository(Photo)

            security.users = users

            const userController = new UserController(users)
            const admission = new AdmissionController(users)
            const photoController = new PhotoController(photos)

            this.addControllers(userController)
            this.addControllers(admission)
            this.addControllers(photoController)

        }).catch((err) => {
            console.log(err)
        })

    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default AppServer;
