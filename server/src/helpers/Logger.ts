import { createLogger, transports, format} from 'winston';

import config from '../config/config';

class Logger {

    private infoLog: any;
    private errorLog: any;
    
    constructor() {
        this.infoLog = this.createInfoLogger();
        this.errorLog = this.createErrorLogger();
    }

    private createInfoLogger(): any {
        const infoLoggerConfig = createLogger({
            transports: [
                new transports.File({
                    level: 'info',
                    filename: config.logs.apiPathLogs,
                    format: format.combine(format.timestamp(), format.simple())
                })
            ]
        });
        return infoLoggerConfig;
    }

    private createErrorLogger(): any {
        const errorLoggerConfig = createLogger({
            transports: [
                new transports.File({
                    level: 'error',
                    filename: config.logs.errorPathLogs,
                    format: format.combine(format.timestamp(), format.simple())
                })
            ]            
        });
        return errorLoggerConfig;
    }
    
    public log(message: any): any {
        this.infoLog.log('info', '\n' + message);
    }

    public error(message: any): any {
        this.errorLog.error('error', '\n' + message);
    }

}

const logger = new Logger();

export default logger;