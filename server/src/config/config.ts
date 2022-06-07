console.log();

const config = {
    server: {
        projectName: process.env.PROJECT_NAME || 'smoothfilling',
        apiName: process.env.API_NAME || 'api',
        port: process.env.SERVER_PORT || 5000
    },
    paths: {
        init: process.env.INIT_PATH || '/',
        projectServerPath: process.env.PROJECT_SERVER_PATH || '/smoothfilling',
        apiServerPath: process.env.API_SERVER_PATH || '/smoothfilling/api/'
    },
    database: {
        engine: process.env.DB_ENGINE || 'mongodb',
        server: process.env.DB_SERVER || 'mongodb://localhost:27017/',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'test',
        url: process.env.DB_URL || 'mongodb://localhost:27017/test'
    },
    logs: {
        apiPathLogs: process.env.LOG_API_SERVER_FILENAME || './logs/api.log',
        errorPathLogs: process.env.LOG_ERRORS_SERVER_FILENAME || './logs/error.log'
    },
    configurations: {
        typeLogin: process.env.TYPE_LOGIN || 'email'
    },
    security: {
        bcryptSaltGeneration: process.env.BCRYPT_SALT_GENERATION || 10
    }
};

export default config;