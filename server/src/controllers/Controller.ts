import homeController from './home.controller';
import usersController from './users.controller';
import tasksController from './tasks.controller';

class Controller {

    public controllers: Object | any;

    constructor() {
        this.controllers = {
            home: homeController,
            users: usersController,
            tasks: tasksController
        };
    }

} 

const controller = new Controller();

export default controller;