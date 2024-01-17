import mongoose, { Schema, SchemaTypes, model } from 'mongoose';

export interface AppDocument extends Document {
    applicationName: string;
    description: string;
    files: Schema.Types.ObjectId[];
    
}
const appSchema = new Schema<AppDocument>({
  applicationName:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  files: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'File',
    },
  ]

});

const App = model<AppDocument>('App', appSchema);

export default App;
