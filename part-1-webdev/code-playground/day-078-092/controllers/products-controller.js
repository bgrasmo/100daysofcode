const Product = require('../models/product-model');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products: products });
  } catch (e) {
    return next(e);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('customer/products/product-details', { product: product });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
