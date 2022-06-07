import homeRoutes from './home.routes';
import usersRoutes from './users.routes';
import tasksRoutes from './tasks.routes';

class Router {

    public routes:Object | any;

    constructor() {
        this.routes = {
            home: homeRoutes,
            users: usersRoutes,
            tasks: tasksRoutes
        };
    }

} 

const router = new Router();

export default router;