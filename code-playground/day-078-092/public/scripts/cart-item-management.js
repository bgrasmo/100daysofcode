const cartItemUpdateFormElements = document.querySelectorAll(
  '.cart-item-management'
);
const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartBadge = document.querySelector('.nav-items .badge');

const updateCartItem = async (event) => {
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return alert('An error happened!');
  }

  if (!response.ok) {
    return alert('Response was nok ok!');
  }

  const responseData = await response.json();

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    // Update sum  price per product
    const cartItemTotalPriceElement =
      form.parentElement.querySelector('.cart-item-price');
      cartItemTotalPriceElement.textContent =
        responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }

  // Update total price for the cart
  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  // Update cart badge
  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
};

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener('submit', updateCartItem);
}
