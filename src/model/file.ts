import mongoose, { Schema, model } from 'mongoose';
export interface FileDocument extends Document {
    userId: Schema.Types.ObjectId[];
    filename: string;
    mimeType: string;
    path: string;
}
const fileSchema = new Schema<FileDocument>({
    userId: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        }

    ],
    filename: {
        type: String,

    },
    mimeType: {
        type: String,

    },

    path: {
        type: String,
    },
});


const File = model<FileDocument>('File', fileSchema);

export default File;
