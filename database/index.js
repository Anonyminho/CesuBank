import mongoose from 'mongoose';

const DB = 'cesubank';

mongoose.connect(`mongodb://localhost/${DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

export default mongoose;
