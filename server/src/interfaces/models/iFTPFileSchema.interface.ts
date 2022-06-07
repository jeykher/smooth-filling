import { Document, ObjectId } from 'mongoose';

export interface iFTPFileSchema extends Document {
    id: ObjectId;
    type: string;
    name: string;
    target: string | undefined;
    sticky: boolean;
    rights: any;
    acl: boolean;
    owner: string;
    group: string;
    size: number;
    date: string;
    host: string;
    fullName: string;
    taskId: ObjectId;
    status: number;
};