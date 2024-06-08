 // Function to handle adding a product to the wishlist
 function addToWishlist(event) {
  const button = event.currentTarget;

  // Get the data attributes from the button
  const productId = button.getAttribute('data-id');
  const variantId = button.getAttribute('data-variant-id');
  const productImage = button.getAttribute('data-image');
  const productTitle = button.getAttribute('data-title');
  const productVendor = button.getAttribute('data-vendor');
  const productPrice = button.getAttribute('data-price');

  // Get current wishlist items from localStorage or initialize as an empty array
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the item is already in the wishlist
  const existingItem = wishlist.find(item => item.productId === productId && item.variantId === variantId);

  if (!existingItem) {
    // Add the new item to the wishlist
    wishlist.push({ productId, variantId, productImage, productTitle, productVendor, productPrice });
    
    // Update the wishlist in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    console.log('Item added to wishlist');
  } else {
    console.log('Item already in wishlist');
  }
}

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Find all wishlist buttons
  const wishlistButtons = document.querySelectorAll('.wishlist-button');

  // Loop through each button and attach a click event listener
  wishlistButtons.forEach(button => {
    button.addEventListener('click', addToWishlist);
  });
});