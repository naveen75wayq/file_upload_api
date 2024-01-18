import mongoose, { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  roles: string[];
  uploads: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ['admin', 'user'],
      default: ['user'],
    },
    uploads: [{
      type: [mongoose.Types.ObjectId],
      ref: 'File', // Assuming the model name for File is 'File'
      default: [],
    }],
  },
  { timestamps: true }
);

const User = model<UserDocument>('User', userSchema);

export default User;
