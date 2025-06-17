const LawyerProfile = require("../Models/LawyerProfileSchema");
const mongoose = require("mongoose"); // Import the LawyerProfile model
const ObjectId = mongoose.Types.ObjectId;
// Create a new lawyer profile
const createLawyerProfile = async (req, res) => {
  try {
    const newProfile = new LawyerProfile({
      ...req.body,
      userId: req.body.userId, // 👈 pull userId directly from request body
    });
    // Log the new profile data for debugging
    await newProfile.save();
    res.status(201).json({ success: true, data: newProfile });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all lawyer profiles
const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await LawyerProfile.find();
    res.status(200).json({ success: true, data: lawyers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a lawyer profile by ID
// const getLawyerById = async (req, res) => {
//   try {
//     const lawyer = await LawyerProfile.findById(req.params.id);
//     if (!lawyer) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Lawyer not found" });
//     }
//     res.status(200).json({ success: true, data: lawyer });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

const getLawyerById = async (req, res) => {
  try {
    // Convert string ID to ObjectId
    const userId = new ObjectId(req.params.id);

    // Find lawyer by userId
    const lawyer = await LawyerProfile.findOne({ userId: userId });

    if (!lawyer) {
      return res
        .status(404)
        .json({ success: false, error: "Lawyer not found" });
    }

    res.status(200).json({ success: true, data: lawyer });
  } catch (error) {
    // This will catch both MongoDB errors and invalid ObjectId format errors
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a lawyer profile
const updateLawyerProfile = async (req, res) => {
  try {
    const lawyer = await LawyerProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!lawyer) {
      return res
        .status(404)
        .json({ success: false, error: "Lawyer not found" });
    }
    res.status(200).json({ success: true, data: lawyer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a lawyer profile
const deleteLawyerProfile = async (req, res) => {
  try {
    const lawyer = await LawyerProfile.findByIdAndDelete(req.params.id);
    if (!lawyer) {
      return res
        .status(404)
        .json({ success: false, error: "Lawyer not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Lawyer profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  createLawyerProfile,
  getAllLawyers,
  getLawyerById,
  updateLawyerProfile,
  deleteLawyerProfile,
};
