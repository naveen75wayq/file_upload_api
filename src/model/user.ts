import mongoose, { Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  roles: string;
  api: string;
}
const userSchema = new Schema<UserDocument>({
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
    type: String,
    required: true,
  },
  api:{
    type: String,
    required: true,
  }
  

},{timestamps: true});

const User = model<UserDocument>('User', userSchema);

export default User;
