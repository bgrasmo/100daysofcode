const productNameInputElement = document.getElementById('product-name');
const remaningCharsElement = document.getElementById('remaining-chars');

const maxAllowedChars = productNameInputElement.maxLength;

function updateRemainingCharacters(event) {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length;

  const remainingCharacters = maxAllowedChars - enteredTextLength;

  if (remainingCharacters === 0) {
    remaningCharsElement.classList.add('error');
    productNameInputElement.classList.add('error');
  } else if (remainingCharacters <= 10) {
    remaningCharsElement.classList.add('warning');
    productNameInputElement.classList.add('warning');
    remaningCharsElement.classList.remove('error');
    productNameInputElement.classList.remove('error');
  } else {
    remaningCharsElement.classList.remove('warning');
    productNameInputElement.classList.remove('warning');
  }
  remaningCharsElement.textContent= remainingCharacters;
}

productNameInputElement.addEventListener('input', updateRemainingCharacters);