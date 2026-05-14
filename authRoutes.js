const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// Ensure this path is correct based on your root-level structure
const authController = require('../controllers/authController'); 
const { verifyToken } = require('../middleware/auth'); 

const storage = multer.diskStorage({
    destination: './uploads/profiles/',
    filename: (req, file, cb) => {
        cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// These functions (register, login, updateProfile) MUST exist in your controller
router.post('/register', authController.register);
router.post('/login', authController.login);

// The error was happening here (Line 23) because updateProfile was undefined
router.post('/update-profile', verifyToken, upload.single('profileImg'), authController.updateProfile);

module.exports = router;