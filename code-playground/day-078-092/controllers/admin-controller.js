const Product = require('../models/product-model');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('admin/products/all-products', { products: products });
  } catch (e) {
    return next(e);
  }
};

const getNewProduct = (req, res) => {
  res.render('admin/products/new-product');
};

const createNewProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (e) {
    return next(e);
  }

  res.redirect('/admin/products');
};

const getUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/products/update-product', { product: product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (e) {
    return next(e);
  }

  res.redirect('/admin/products');
};

const deleteProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (e) {
    return next(e);
  }

  res.json({ message: 'Deleted product!' });
};

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
