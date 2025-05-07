import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contacts - Create a new contact
router.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, jobTitle, company, email, phone, linkedin, city, state, country } = req.body;

    const newContact = new Contact({
      firstName,
      lastName,
      jobTitle,
      company,
      email,
      phone,
      linkedin,
      city,
      state,
      country,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error("Error saving contact:", err.message);
    res.status(500).json({ error: "Failed to save contact" });
  }
});

export default router;
