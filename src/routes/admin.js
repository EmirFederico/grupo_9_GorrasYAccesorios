// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const validationsAddProduct = require('../middlewares/validateAddProduct');
const authMiddleware = require('../middlewares/authMiddleware');

// ************ Controller Require ************
const adminController = require('../controllers/adminController');

// ************ Multer ************
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
       cb(null, './src/public/img');
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
    
})

const upload = multer({storage: storage});



// ************ Routes ************


router.get('/', adminController.admin)
router.get('/agregar', authMiddleware, adminController.agregar);
router.post('/', upload.single("productImage"), validationsAddProduct, adminController.store)



module.exports = router;