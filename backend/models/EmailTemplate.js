import mongoose from 'mongoose';

const emailTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Follow-Up Intro"
  subject: { type: String, required: true },
  body: { type: String, required: true },
  signature: { type: String }, // optional custom signature
  createdBy: { type: String }, // user ID or email, for multi-user support
  createdAt: { type: Date, default: Date.now },
});

const EmailTemplate =
  mongoose.models.EmailTemplate || mongoose.model('EmailTemplate', emailTemplateSchema);

export default EmailTemplate;
