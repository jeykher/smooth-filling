import mongoose from 'mongoose';

import Logger from '../../helpers/Logger';

class MongoDBConnection {
    
    mongoDBPath: string;

    public constructor(mongoUri: string) {
        this.mongoDBPath = mongoUri;
    }

    public async connect() {
        try {
            const mongoConfiguration = {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            mongoose.Promise = global.Promise;
            console.log('Connecting with MongoDB server...');
            await mongoose.connect(this.mongoDBPath, mongoConfiguration);
            console.log('MongoDB connection has been establish successfully.');
            Logger.log('MongoDB connection has been establish successfully.');
        }
        catch(error: any) {
            console.log('MongoDB connection has failed!');
            console.log(error);
            Logger.error('MongoDB connection has failed!.');
        }
    }

    public async disconnect() {
        console.log('Disconnecting from MongoDB...');
        await mongoose.disconnect();
        console.log('MongoDB connection has finished.');
        Logger.log('MongoDB connection has finished.');
    }

}

export default MongoDBConnection;