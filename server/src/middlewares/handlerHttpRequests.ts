import { Request, Response, NextFunction } from 'express';

const handlerHttpRequests = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
};

export default handlerHttpRequests;