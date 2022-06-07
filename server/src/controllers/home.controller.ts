import { Request, Response, NextFunction } from 'express';

import DataBroker from '../helpers/DataBroker';
import Logger from '../helpers/Logger';

const homeController = {
    home: (req: Request, res: Response, next: NextFunction): Response => {
        console.log('It has been registered a client request on home controller and home service using GET method.');
        Logger.log('It has been registered a client request on home controller and home service using GET method.');
        return DataBroker.sendData(res, 'home', 'home', [], "Welcome to Smooth Filling Api.", []);
    }
};

export default homeController;