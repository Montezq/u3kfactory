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
      
      // Show the wishlist modal if the user hasn't opted out
      if (!localStorage.getItem('dontShowWishlistModal')) {
        document.querySelector('.wishlist__modal').classList.remove('hidden');
      }
    } else {
      console.log('Item already in wishlist');
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
    const wishlistButtons = document.querySelectorAll('.wishlist-button');

    // Loop through each button and attach a click event listener
    wishlistButtons.forEach(button => {
      button.addEventListener('click', addToWishlist);
    });

    // Check if any buttons match items in the wishlist
    checkWishlistButtons();

    // Attach event listener to close button of the modal
    document.querySelector('.wishlist__modal-close').addEventListener('click', hideWishlistModal);

    // Attach event listener to "Don't show this again" link
    document.querySelector('.dont-show-wishlist-modal').addEventListener('click', dontShowWishlistModal);
  });