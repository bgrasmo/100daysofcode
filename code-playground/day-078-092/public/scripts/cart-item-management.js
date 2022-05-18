const cartItemUpdateFormElement = document.querySelectorAll(
  '.cart-item-management'
);

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
        quantify: quantity,
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
};

for (const formElement of cartItemUpdateFormElement) {
  formElement.addEventListener('submit', updateCartItem);
}
