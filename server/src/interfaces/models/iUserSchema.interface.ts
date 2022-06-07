import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';

export interface iUserSchema extends Document {
    id: ObjectID;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    role: string;
    active?: boolean;
    verifyDocumentExists: () => Promise<boolean>;
    comparePassword: () => Promise<boolean>;
}; 