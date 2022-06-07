import { Document, ObjectId } from 'mongoose';

export interface iTask extends Document {
    id: ObjectId;
    name: string;
    description: string;
    host: string;
    path: string;
    format: string;
    status: number;
    lastDate: Date;
    scheme: string;
    collectionName: string;
    collectionKey: string;
    templateID: string;
};