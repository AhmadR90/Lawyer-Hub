const express = require('express');
const router = express.Router();
const {createLawyerProfile,getAllLawyers,getLawyerById,updateLawyerProfile,deleteLawyerProfile} = require ("../Controllers/LawyerProfile");

router.post('/create',createLawyerProfile);
router.get('/getall', getAllLawyers);
router.get('/getbyid/:id', getLawyerById);
router.put('/update:id', updateLawyerProfile);
router.delete('/:id', deleteLawyerProfile);

module.exports = router;
