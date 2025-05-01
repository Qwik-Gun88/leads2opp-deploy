// backend/models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  jobTitle: String,
  company: String,
  email: String,
  phone: String,
  linkedin: String,
  city: String,
  state: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", contactSchema);
