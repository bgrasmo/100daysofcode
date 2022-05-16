const addCartItem = () => {
  res.locals.cart.addItem();
}

module.exports = {
  addCartItem: addCartItem,
}