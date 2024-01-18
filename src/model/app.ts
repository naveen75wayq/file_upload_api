import mongoose, { Schema, SchemaTypes, model } from 'mongoose';

export interface AppDocument extends Document {
    applicationName: string;
    apiKey: string;
    whitelistedDomains: string[];
    
}
const appSchema = new Schema<AppDocument>({
  applicationName:{
    type: String,
    required: true,
  },
  apiKey: { type: String, required: true, unique: true },
  whitelistedDomains: [{ type: String, required: true }],

});

const App = model<AppDocument>('App', appSchema);

export default App;
