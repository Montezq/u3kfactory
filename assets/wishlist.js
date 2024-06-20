// Function to handle adding or removing a product to/from the wishlist
function addToWishlist(event) {
  const button = event.currentTarget;

  // Get the data attributes from the button
  const productId = button.getAttribute('data-id');
  const productUrl = button.getAttribute('data-url');
  const variantId = button.getAttribute('data-variant-id');
  const productImage = button.getAttribute('data-image');
  const productTitle = button.getAttribute('data-title');
  const productVendor = button.getAttribute('data-vendor');
  const productPrice = button.getAttribute('data-price');
  const noVariant = button.getAttribute('data-no-variant') === 'true';
  if (noVariant){
    console.log('no-variant')
  }

  // Get current wishlist items from localStorage or initialize as an empty array
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the item is already in the wishlist
  const existingItem = wishlist.find(item => item.productId === productId && item.variantId === variantId);

  if (!existingItem) {
    // Add the new item to the wishlist
    wishlist.push({
      productId,
      productUrl,
      variantId,
      productImage,
      productTitle,
      productVendor,
      productPrice,
      noVariant
    });

    // Update the wishlist in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    console.log('Item added to wishlist');
    button.classList.add('match');
    // Show the wishlist modal if the user hasn't opted out
    if (!localStorage.getItem('dontShowWishlistModal')) {
      document.querySelector('.wishlist__modal').classList.remove('hidden');
    }
  } else {
    // Remove the item from the wishlist
    removeFromWishlist(productId, variantId);
    button.classList.remove('match');
  }
}

// Function to remove an item from the wishlist
function removeFromWishlist(productId, variantId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(item => !(item.productId === productId && item.variantId === variantId));
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  console.log('Item removed from wishlist');

  // Show the removed wishlist modal
  const removedModal = document.querySelector('.removed-wishlist__modal');
  if (removedModal) {
    removedModal.classList.remove('hidden');
    setTimeout(() => {
      removedModal.classList.add('hidden');
    }, 1000); // Wait for 1 second before hiding the modal
  }
}

// Function to check if items in wishlist and add 'match' class to corresponding buttons
function checkWishlistButtons() {
  // Get current wishlist items from localStorage
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Find all wishlist buttons
  const wishlistButtons = document.querySelectorAll('.wishlist-button');

  wishlistButtons.forEach(button => {
    const variantId = button.getAttribute('data-variant-id');

    const match = wishlist.find(item => item.variantId === variantId);

    if (match) {
      button.classList.add('match');
    }
  });
}

// Function to hide the wishlist modal
function hideWishlistModal() {
  document.querySelector('.wishlist__modal').classList.add('hidden');
}

// Function to handle the "Don't show this again" action
function dontShowWishlistModal(event) {
  event.preventDefault();
  localStorage.setItem('dontShowWishlistModal', 'true');
  hideWishlistModal();
}

// Ensure the DOM is fully loaded before attaching event listeners and checking buttons
document.addEventListener('DOMContentLoaded', () => {
  // Find all wishlist buttons
  const wishlistButtons = document.querySelectorAll('.wishlist-button[data-toggle="true"]');

  if (wishlistButtons.length > 0) {
    // Loop through each button and attach a click event listener
    wishlistButtons.forEach(button => {
      button.addEventListener('click', addToWishlist);
    });

    // Check if any buttons match items in the wishlist
    checkWishlistButtons();
  }

  // Attach event listener to close button of the modal
  const wishlistModalCloseButton = document.querySelector('.wishlist__modal-close');
  if (wishlistModalCloseButton) {
    wishlistModalCloseButton.addEventListener('click', hideWishlistModal);
  }

  // Attach event listener to "Don't show this again" link
  const dontShowWishlistModalLink = document.querySelector('.dont-show-wishlist-modal');
  if (dontShowWishlistModalLink) {
    dontShowWishlistModalLink.addEventListener('click', dontShowWishlistModal);
  }
});