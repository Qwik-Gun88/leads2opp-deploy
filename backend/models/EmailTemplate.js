import mongoose from 'mongoose';

const emailTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  signature: { type: String },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent OverwriteModelError
export default mongoose.models.EmailTemplate || mongoose.model('EmailTemplate', emailTemplateSchema);
