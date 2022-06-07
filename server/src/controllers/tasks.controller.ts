import { Request, Response, NextFunction } from 'express';

import Task from '../models/tasks/models/tasks.model';

import DataBroker from '../helpers/DataBroker';
import Logger from '../helpers/Logger';
import TaskFTPBroker from '../helpers/TaskFTPBroker';

const tasksController = {
    info: (req: Request, res: Response, next: NextFunction) => {
        console.log('It has been registered a client request on tasks controller and info service using GET method.');
        Logger.log('It has been registered a client request on tasks controller and info service using GET method.');
        DataBroker.sendData(res, 'users', 'info', [], "Smooth Tasks API Services.", []);
    },
    importFTPData: async (req: Request, res: Response, next: NextFunction) => {
        const taskFTPBroker: any = new TaskFTPBroker();
        taskFTPBroker.importFTPData();
        const data = await taskFTPBroker.getData();
        console.log(data);
    } 
};

export default tasksController;