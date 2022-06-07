import { Request, Response, NextFunction } from 'express';

import User from '../models/users/models/users.model';

import DataBroker from '../helpers/DataBroker';
import Logger from '../helpers/Logger';

const usersController = {
    info: (req: Request, res: Response, next: NextFunction) => {
        console.log('It has been registered a client request on users controller and info service using GET method.');
        Logger.log('It has been registered a client request on users controller and info service using GET method.');
        DataBroker.sendData(res, 'users', 'info', [], "Smooth Users API Services.", []);
    },
    signup: async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
        console.log('It has been registered a client request on users controller and signup service using POST method.');
        Logger.log('It has been registered a client request on users controller and signup service using POST method.');
        const { username, email, firstname, lastname, password } = req.body;
        try {
            let documentExists = await User.findOne({
                email
            });
            if(documentExists) 
                throw new Error('Email exists yet. Please use a valid email account.',);               
            const user = new User({
                username,
                email,
                firstname, 
                lastname,
                password
            });
            const userCreated = await user.save();            
            console.log(`It has been registered a new user with id ${userCreated._id}.`);
            Logger.log(`It has been registered a new user with id ${userCreated._id}.`);
            DataBroker.sendData(res, 'users', 'signup', userCreated, "User has been registered successfully.", null);
        }
        catch(error: any) {
            console.log(`It cannot register ${email}.`);
            Logger.error(`It cannot register ${email}.`);
            Logger.error(error.message);
            DataBroker.sendError(
                res, 'users', 
                'signup', 
                [], 
                `It cannot register ${email}.`,
                [
                    {
                        type: 'CreateDocument',
                        message: error.message
                    }
                ] 
            );
        }
    }
};

export default usersController;