const ClientProfile = require("../Models/ClientProfile.js");

// @desc Create new client profile
// @route POST /api/client-profile
const createProfile = async (req, res) => {
  try {
    const { name, email, phone, address, userId } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await ClientProfile.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Profile with this email already exists" });
    }

    const profile = await ClientProfile.create({
      name,
      email,
      phone,
      address,
      userId,
    });
    res.status(201).json(profile);
  } catch (err) {
    console.error("Create profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all client profiles
// @route GET /api/client-profile
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ClientProfile.find().sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (err) {
    console.error("Get profiles error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// const getProfileById = async (req, res) => {
//   try {
//     const userId = req.params.id; // Get userId from request body or params
//     console.log("userId:", userId);
//     const profile = await ClientProfile.findById({ userId });
//     if (!profile) return res.status(404).json({ message: "Profile not found" });
//     res.status(200).json(profile);
//   } catch (err) {
//     console.error("Get profile by ID error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const mongoose = require('mongoose');

const getProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId:", userId);

    // Convert to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    const profile = await ClientProfile.findOne({ userId: objectId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("Get profile by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProfile, getProfileById, getAllProfiles };
