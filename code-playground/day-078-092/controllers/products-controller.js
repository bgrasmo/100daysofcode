const Product = require('../models/product-model');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products: products });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getAllProducts: getAllProducts,
}