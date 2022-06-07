import { Schema, model } from 'mongoose';

import { iTaskSchema } from '../../../interfaces/models/iTaskSchema.interface';

const TaskSchema = new Schema<iTaskSchema>({
    id: {
        type: Schema.Types.ObjectId,
        rel: 'Task'
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    host: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    path: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    format: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    lastDate: {
        type: Date
    },
    scheme: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    collectionName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    collectionKey: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    templateId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

const TaskModel = model<iTaskSchema>('Task', TaskSchema);

export default TaskModel;