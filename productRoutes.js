const express = require('express');
const router = express.Router();
// Fix: Ensure path is relative to the 'routes' folder and matches filename case
const Product = require('../models/Product'); 

router.get('/', async (req, res) => {
    try {
        // Use Sequelize method
        const products = await Product.findAll(); 
        res.json(products);
    } catch (err) {
        console.error("Product Fetch Error:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;