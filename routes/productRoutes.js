const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductsForView,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/view', getProductsForView);
router.get('/:pid', getProductById);  // Ruta para obtener un producto por ID
router.post('/', addProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

module.exports = router;
