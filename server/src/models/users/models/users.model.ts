import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { iUserSchema } from '../../../interfaces/models/iUserSchema.interface';

import UserMethods  from '../controllers/userMethods';

const UserSchema = new Schema<iUserSchema>({
    id: {
        type: Schema.Types.ObjectId,
        rel: 'User'
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&´*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&´*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    firstname: {
        type: String,
        required: true 
    },
    lastname: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        default: 'user'
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

UserSchema.pre<iUserSchema>('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.role = 'user';
    next();
});

UserSchema.methods.verifyDocumentExists = UserMethods.verifyDocumentExists;
UserSchema.methods.comparePassword = UserMethods.comparePassword;

const UserModel = model<iUserSchema>('User', UserSchema);

export default UserModel;