import { Response } from 'express';

const DataBroker = {
    sendData: (res: Response, controller: string, service: string, data: any, message: string, error: any): Response => {
        return res.status(200).json({
            data: {
                controller,
                service,
                type: 'DataPackage',
                data,
                message,
                error
            }
        });
    },
    sendError: (res: Response, controller: string, service: string, data: any, message: string, error: any): any => {
        return res.status(400).json({
            data: {
                controller,
                service,
                type: 'ErrorPackage',
                data,
                message,
                error
            }
        });
    }
};

export default DataBroker;