const stripe = require('stripe')('sk_test_51L1F1wAaRTqEAR7ewyOSV0EJfclNDZ5yxdQcRfUiT4ELPuqCn53ANbTxaGbhHt1yQcJ9M3QqaSksa42HnOFpcpAc00nKRUHE3e');

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

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map((item) => {
      return {
        price_data: {
          currency: 'NOK',
          product_data: {
            name: item.product.title
          },
          unit_amount: +item.product.price.toFixed(2) * 100
        },
        quantity: +item.quantity,
      }
    }),
    mode: 'payment',
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/cancel`,
  });

  res.redirect(303, session.url);
}

const getSuccess = (req, res) => {
  res.render('customer/orders/success');
}

const getFailure = (req, res) => {
  res.render('customer/orders/failure');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure,
};
