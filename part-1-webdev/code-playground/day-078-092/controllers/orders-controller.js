const Order = require('../models/order-model');
const User = require('../models/user-model');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders,
    });
  } catch (e) {
    next(e);
  }
}

const addOrder = async (req, res, next) => {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (e) {
    return next(e);
  }
  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (e) {
    return next(e);
  }

  req.session.cart = null;

  res.redirect('/orders');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
