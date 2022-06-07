import { Schema, model } from 'mongoose';

import { iFTPFileSchema } from '../../../interfaces/models/iFTPFileSchema.interface';

const FTPFileSchema = new Schema<iFTPFileSchema>({
    id: {
        type: Schema.Types.ObjectId,
        rel: 'Task'
    },
    type: {
        type: String
    },
    name: {
        type: String
    },
    target: {
        type: String
    },
    sticky: {
        type: Boolean
    },
    right: {
        type: {}
    },
    acl: {
        type: Boolean
    },
    owner: {
        type: String
    },
    group: {
        type: String
    },
    size: {
        type: Number
    },
    date: {
        type: String
    },
    host: {
        type: String
    },
    fullName: {
        type: String
    },
    taskId: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const FTPFileModel = model<iFTPFileSchema>('FTPFile', FTPFileSchema);

export default FTPFileModel;