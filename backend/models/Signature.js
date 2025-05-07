import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema({
  userId: String, // You can update this later if auth is added
  name: { type: String, required: true },
  html: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const Signature = mongoose.model('Signature', signatureSchema);

export default Signature;
