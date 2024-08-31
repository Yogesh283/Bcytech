import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true }
});

const MyModel = mongoose.model('MyModel', DataSchema);

export default MyModel;
