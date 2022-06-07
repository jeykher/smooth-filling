import { Schema, model } from 'mongoose';

import { iFLCorporationSchema } from '../../../interfaces/models/iFLCorporationSchema.interface';

const FLCorporationSchema = new Schema<iFLCorporationSchema>({
    id: {
        type: Schema.Types.ObjectId,
        rel: 'Task'
    },
    COR_NUMBER: {
        type: String
    },
    COR_NAME: {
        type: String
    }
}, {
    timestamps: true
});

const FLCorporationModel = model<iFLCorporationSchema>('FLCorporation', FLCorporationSchema);

export default FLCorporationModel;