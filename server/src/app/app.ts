import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

import config from '../config/config';

import Router from '../routes/Router';

import Logger from '../helpers/Logger';

import handleHttpRequests from '../middlewares/handlerHttpRequests';

class App {
    
    private app: Application;
    private serverPort: number | string;

    constructor(port: number | string) {
        this.app = express();
        this.serverPort = port;
        this.applySettings();
        this.useMiddlewares();
        this.useCustomMiddlewares();
        this.useRoutes();
    }

    private applySettings() {
        this.app.set('port', this.serverPort);
        this.app.set('jsonSpaces', 4);
    }

    private useMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({
            extended: false
        }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(compression());
    }

    private useCustomMiddlewares() {
        this.app.use(handleHttpRequests);
    }

    private useRoutes() {
        const { init, projectServerPath, apiServerPath} = config.paths;
        const { home, users, tasks } = Router.routes;
        this.app.use(init, home);
        this.app.use(projectServerPath, home);
        this.app.use(apiServerPath, home);
        this.app.use(apiServerPath + 'users', users);
        this.app.use(apiServerPath + 'processes/tasks', tasks);
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.log("Server deployed on port ", this.app.get('port'));
        Logger.log(`Server deployed on port ${this.app.get('port')}`);
    }

}

export default App;