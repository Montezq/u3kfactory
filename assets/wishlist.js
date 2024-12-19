// Function to handle adding or removing a product to/from the wishlist


function addToWishlist(event) {
  let bodyEl = document.querySelector('body');
  const button = event.currentTarget;

  // Get the data attributes from the button
  const productId = button.getAttribute('data-id');
  const productUrl = button.getAttribute('data-url');
  const variantId = button.getAttribute('data-variant-id');
  const productImage = button.getAttribute('data-image');
  const productTitle = button.getAttribute('data-title');
  const productVendor = button.getAttribute('data-vendor');
  const productPrice = button.getAttribute('data-price');
  const vatText = button.getAttribute('data-vat-text');
  const available = button.getAttribute('data-available');
  const collectionList = button.getAttribute('data-collections');
  const noVariant = button.getAttribute('data-no-variant') === 'true';
  const dataToggle = button.getAttribute('data-toggle') === 'true';
  const dataUnframed = button.getAttribute('data-unframed') === 'true';

  let optionSize, optionMaterial;
  if (!noVariant) {
    optionSize = button.getAttribute('data-variant-option-size');
    optionMaterial = button.getAttribute('data-variant-option-material') || button.getAttribute('data-variant-option-medium');
  }
  // Get current wishlist items from localStorage or initialize as an empty array
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the item is already in the wishlist
  const existingItemGeneral = wishlist.find(item => item.productId === productId);
  const existingItem = wishlist.find(item => item.productId === productId && item.variantId === variantId);
  if (existingItemGeneral && dataToggle) {
    // Remove all items with the same productId from the wishlist
    wishlist = wishlist.filter(item => item.productId !== productId);

    // Update the wishlist in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    button.classList.remove('match');
    const removedModal = document.querySelector('.removed-wishlist__modal');
    if (removedModal) {
      removedModal.classList.remove('hidden');
      setTimeout(() => {
        removedModal.classList.add('hidden');
      }, 1000); // Wait for 1 second before hiding the modal
    }
    return;
  }
  if (!existingItem) {
    // Check if there is an item with the same productId and noVariant set to true
    if (!noVariant) {
      wishlist = wishlist.filter(item => !(item.productId === productId && item.noVariant));
    }

    // Add the new item to the start of the wishlist
    const newItem = {
      productId,
      productUrl,
      variantId,
      productImage,
      productTitle,
      productVendor,
      productPrice,
      noVariant,
      vatText,
      collectionList,
      available
    };
    if (!noVariant) {
      newItem.optionSize = optionSize;
      newItem.optionMaterial = optionMaterial;
    }
    if(dataUnframed){
      newItem.dataUnframed = dataUnframed
    }
    wishlist.unshift(newItem);

    // Update the wishlist in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    button.classList.add('match');
    // Show the wishlist modal if the user hasn't opted out
    if (!localStorage.getItem('dontShowWishlistModal')) {
      document.querySelector('.wishlist__modal').classList.remove('hidden');
      bodyEl.classList.add('overflow-hidden');
    }
  } else if (dataToggle) {
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
    const productId = button.getAttribute('data-id');
    const dataToggle = button.getAttribute('data-toggle') === 'true';
    const variantId = button.getAttribute('data-variant-id');
    if (dataToggle) {
      const match = wishlist.find(item => item.productId === productId);
      if (match) {
        button.classList.add('match');
      }
      return;
    }

    const match = wishlist.find(item => item.variantId === variantId);

    if (match) {
      button.classList.add('match');
    }
  });
}

// Function to hide the wishlist modal
function hideWishlistModal() {
  let bodyEl = document.querySelector('body');
  document.querySelector('.wishlist__modal').classList.add('hidden');
  bodyEl.classList.remove('overflow-hidden');
}

// Function to handle the "Don't show this again" action
function dontShowWishlistModal(event) {
  event.preventDefault();
  localStorage.setItem('dontShowWishlistModal', 'true');
  hideWishlistModal();
}

// Function to reinitialize the wishlist functionality
const reinitializeWishlist = () => {
  // Find all wishlist buttons
  const wishlistButtons = document.querySelectorAll('.wishlist-button');
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

  const wishlistModalWrapper = document.querySelector('.wishlist__modal-wrapper');
  const wishlistModal = document.querySelector('.wishlist__modal');
  if (wishlistModal) {
    wishlistModal.addEventListener('click', (event) => {
      if (!wishlistModalWrapper.contains(event.target)) {
        hideWishlistModal();
      }
    });
  }

  // Attach event listener to "Don't show this again" link
  const dontShowWishlistModalLink = document.querySelector('.dont-show-wishlist-modal');
  if (dontShowWishlistModalLink) {
    dontShowWishlistModalLink.addEventListener('click', dontShowWishlistModal);
  }
}

// Initial call to reinitialize the wishlist functionality
document.addEventListener('DOMContentLoaded', () => {
  reinitializeWishlist();
});