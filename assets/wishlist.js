// Function to handle adding a product to the wishlist
function addToWishlist(event) {
  const button = event.currentTarget;
  console.log(event)
  // Get the data attributes from the button
  const productId = button.getAttribute('data-id');
  const variantId = button.getAttribute('data-variant-id');
  const productImage = button.getAttribute('data-image');
  const productTitle = button.getAttribute('data-title');
  const productVendor = button.getAttribute('data-vendor');
  const productPrice = button.getAttribute('data-price');

  // Add the product to the wishlist
  addToWishlist(productId, variantId, productImage, productTitle, productVendor, productPrice);
}

// Find all wishlist buttons
const wishlistButtons = document.querySelectorAll('.wishlist-button');

// Loop through each button and attach a click event listener
wishlistButtons.forEach(button => {
  button.addEventListener('click', addToWishlist);
});