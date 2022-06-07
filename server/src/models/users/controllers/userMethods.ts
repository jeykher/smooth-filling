import bcrypt from 'bcryptjs';

import User from '../models/users.model';

const UserMethods = {
    verifyDocumentExists: async (field: any) => {
        let documentExists = await User.findOne({field});
        if(documentExists) {
            return true;
        }
        else {
            return false;
        }
    },
    comparePassword: async (password: string, passwordStored: string) => {
        return await bcrypt.compare(password, passwordStored);
    }
};

export default UserMethods;