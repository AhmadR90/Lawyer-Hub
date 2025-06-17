const express = require("express");
const router = express.Router();
const {
  createProfile,
  getAllProfiles,
  getProfileById,
} = require("../Controllers/clientProfileController");

router.post("/create-client", createProfile);
router.get("/getall", getAllProfiles);
router.get("/:id", getProfileById);

module.exports = router;
