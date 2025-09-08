// search functionality

/*
const navSearch = document.getElementById('navSearch');
const artCards = document.querySelectorAll('.artsy-card');

function runSearch(keyword) {
  keyword = keyword.toLowerCase();
  let firstMatch = null;

  artCards.forEach(card => {
    const artistName = card.querySelector('.artist-name').textContent.toLowerCase();
    const artTitle = card.querySelector('.art-title').textContent.toLowerCase();

    if (keyword && (artistName.includes(keyword) || artTitle.includes(keyword))) {
      card.classList.add("highlight");
      card.classList.remove("dim");
      if (!firstMatch) firstMatch = card;
    } else if (keyword) {
      card.classList.add("dim");
      card.classList.remove("highlight");
    } else {
      card.classList.remove("highlight", "dim");
    }
  });

  if (firstMatch) firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Event listener for navbar search
navSearch.addEventListener('input', (e) => runSearch(e.target.value));


// Listen for typing in navbar search
navSearch.addEventListener('input', (e) => {
  runSearch(e.target.value);
});
*/

// user name display
function userdisplay() {
    const fn = sessionStorage.getItem("Firstname");
    if (fn) {
        document.getElementById("Signin").style.display = "none";
        document.getElementById("username").style.display = "inline";
        document.getElementById("username").innerText = fn;
    } else {
        document.getElementById("Signin").style.display = "inline";
        document.getElementById("username").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", userdisplay);
// navbar hamburger
const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links");

if (hamburger && navLinksContainer) {
  hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
  });
}
// logout
let lout=document.getElementById("logout");
lout.addEventListener("click",()=>{
  sessionStorage.clear();
});

// Hero Carousel Auto Slide
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    slideIndex = idx;
    showSlide(slideIndex);
  });
});

// Auto play every 5 seconds
setInterval(nextSlide, 5000);

// Init first slide
showSlide(slideIndex);


// dropdown
const userButton = document.getElementById("username");
const dropdown = document.getElementById("dropdown");

// Toggle dropdown
userButton.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Close dropdown on outside click
window.addEventListener("click", function (e) {
  if (!userButton.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// Logout button
document.getElementById("logout").addEventListener("click", function (e) {
  e.preventDefault();
  // Example logout logic
  document.getElementById("username").style.display="none";
  document.getElementById("Signin").style.display="inline";
  window.location.href="index.html";
});

/*
// filter slide bar functionality

const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebar = document.getElementById('filterSidebar');
const overlay = document.getElementById('overlay');


openBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});



// Show the newsletter popup after 5 seconds
window.addEventListener('load', () => {
  const fn = sessionStorage.getItem("Firstname");
  if (!fn) {   // show popup only if user is not logged in
    setTimeout(() => {
      document.getElementById('newsletterPopup').style.display = 'block';
      document.getElementById('popupOverlay').style.display = 'block';
    }, 5000);
  }
});

// Close popup logic
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('newsletterPopup').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
});

// Close popup if overlay clicked
document.getElementById('popupOverlay').addEventListener('click', () => {
  document.getElementById('newsletterPopup').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
});

*/


/*
// Artwork double-click like toggle
document.querySelectorAll('.artsy-card').forEach(card => {
  const wrapper = card.querySelector('.image-wrapper');
  const heart = card.querySelector('.double-tap-heart');
  const likeIcon = card.querySelector('.like-icon i');

  // Double-click on image → show big heart + activate small heart
  wrapper.addEventListener('dblclick', () => {
    heart.classList.add('animate');
    likeIcon.classList.add('fas', 'liked');
    likeIcon.classList.remove('far');

    heart.addEventListener('animationend', () => {
      heart.classList.remove('animate');
    }, { once: true });
  });

  // Click small heart → toggle
  likeIcon.parentElement.addEventListener('click', () => {
    if (likeIcon.classList.contains('fas')) {
      likeIcon.classList.remove('fas', 'liked');
      likeIcon.classList.add('far');
    } else {
      likeIcon.classList.remove('far');
      likeIcon.classList.add('fas', 'liked');
    }
  });
});
*/


  
// Global variables
let wishlistItems = [];
let wishlistCount = 0;
const wishlistCounter = document.getElementById("wishlistCount");

// Function to get wishlist from localStorage
function getWishlistFromStorage() {
  try {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (e) {
    console.error('Error reading wishlist from localStorage:', e);
    return [];
  }
}

// Function to save wishlist to localStorage
function saveWishlistToStorage(wishlist) {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('Wishlist saved to localStorage:', wishlist.length, 'items');
    
    // Dispatch storage event for other pages
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'wishlist',
      newValue: JSON.stringify(wishlist),
      storageArea: localStorage
    }));
  } catch (e) {
    console.error('Error saving wishlist to localStorage:', e);
  }
}

// Update wishlist count display
function updateWishlistCount() {
  wishlistItems = getWishlistFromStorage(); // Sync with localStorage
  wishlistCount = wishlistItems.length;
  wishlistCounter.textContent = wishlistCount;
  console.log('Wishlist count updated:', wishlistCount);
}

// Add item to wishlist
function addToWishlist(artwork) {
  // Get current wishlist from localStorage
  wishlistItems = getWishlistFromStorage();
  
  // Check if item already exists (compare by image src)
  const exists = wishlistItems.some(item => 
    (item.imgSrc || item.img) === artwork.img
  );
  
  if (!exists) {
    // Create consistent data structure for wishlist.html
    const wishlistItem = {
      artistName: artwork.artist,
      artTitle: artwork.title,
      artGallery: artwork.gallery,
      artPrice: artwork.price,
      imgSrc: artwork.img, // Use imgSrc to match wishlist.html expectations
      img: artwork.img     // Keep both for compatibility
    };
    
    wishlistItems.push(wishlistItem);
    
    // Save to localStorage
    saveWishlistToStorage(wishlistItems);
    
    // Update count
    updateWishlistCount();
    
    console.log("Added to wishlist:", artwork.title);
    showAddMessage(artwork.title);
  }
}

// Remove item from wishlist
function removeFromWishlist(artworkImg) {
  wishlistItems = getWishlistFromStorage();
  
  // Remove item from array
  wishlistItems = wishlistItems.filter(item => 
    (item.imgSrc || item.img) !== artworkImg
  );
  
  // Save to localStorage
  saveWishlistToStorage(wishlistItems);
  
  // Update count
  updateWishlistCount();
  
  // Update the heart icon in collect page
  const artCards = document.querySelectorAll('.artsy-card');
  artCards.forEach(card => {
    const img = card.querySelector('img');
    if (img && img.src === artworkImg) {
      const likeIcon = card.querySelector('.like-icon');
      if (likeIcon) {
        likeIcon.classList.remove('liked');
        likeIcon.querySelector('i').classList.remove('fas');
        likeIcon.querySelector('i').classList.add('far');
      }
    }
  });
  
  console.log("Removed from wishlist:", artworkImg);
}

// Show add message
function showAddMessage(title) {
  const message = document.createElement('div');
  message.className = 'add-message';
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #694e39;
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  `;
  
  message.innerHTML = `
    <i class="fas fa-heart" style="margin-right: 8px;"></i>
    Added "${title}" to wishlist
  `;
  
  document.body.appendChild(message);
  
  // Auto remove message after 3 seconds
  setTimeout(() => {
    if (message.parentNode) {
      message.remove();
    }
  }, 3000);
}

// Initialize the wishlist functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
  
  // Load existing wishlist and update count
  updateWishlistCount();
  
  // Add event listeners to all existing art cards
  document.querySelectorAll('.artsy-card').forEach(card => {
    const wrapper = card.querySelector('.image-wrapper');
    const heart = card.querySelector('.double-tap-heart');
    const likeIcon = card.querySelector('.like-icon');
    const heartIcon = likeIcon.querySelector('i');
    const img = card.querySelector('img');
    
    // Check if this item is already in wishlist and update UI
    const currentWishlist = getWishlistFromStorage();
    const isLiked = currentWishlist.some(item => 
      (item.imgSrc || item.img) === img.src
    );
    
    if (isLiked) {
      likeIcon.classList.add('liked');
      heartIcon.classList.remove('far');
      heartIcon.classList.add('fas');
    }

    // Double-click on image → add to wishlist + show animation
    wrapper.addEventListener('dblclick', () => {
      // Get artwork data
      const artwork = {
        title: card.querySelector('.art-title').textContent.trim(),
        artist: card.querySelector('.artist-name').childNodes[0].textContent.trim(),
        img: img.src,
        gallery: card.querySelector('.art-gallery').textContent.trim(),
        price: card.querySelector('.art-price').textContent.trim()
      };

      // Check if already liked
      if (!likeIcon.classList.contains('liked')) {
        // Add to wishlist
        addToWishlist(artwork);
        
        // Update heart icon to liked state
        likeIcon.classList.add('liked');
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
      }

      // Show heart animation
      heart.classList.add('animate');
      heart.addEventListener('animationend', () => {
        heart.classList.remove('animate');
      }, { once: true });
    });

    // Click small heart → toggle wishlist
    likeIcon.addEventListener('click', (e) => {
      e.preventDefault();
      
      const artwork = {
        title: card.querySelector('.art-title').textContent.trim(),
        artist: card.querySelector('.artist-name').childNodes[0].textContent.trim(),
        img: img.src,
        gallery: card.querySelector('.art-gallery').textContent.trim(),
        price: card.querySelector('.art-price').textContent.trim()
      };

      if (likeIcon.classList.contains('liked')) {
        // Remove from wishlist
        removeFromWishlist(artwork.img);
        likeIcon.classList.remove('liked');
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
      } else {
        // Add to wishlist
        addToWishlist(artwork);
        likeIcon.classList.add('liked');
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
      }
    });
  });

  // Search functionality
  const navSearch = document.getElementById('navSearch');
  
  function runSearch(keyword) {
    keyword = keyword.toLowerCase();
    let firstMatch = null;
    const artCards = document.querySelectorAll('.artsy-card');

    artCards.forEach(card => {
      const artistName = card.querySelector('.artist-name').textContent.toLowerCase();
      const artTitle = card.querySelector('.art-title').textContent.toLowerCase();

      if (keyword && (artistName.includes(keyword) || artTitle.includes(keyword))) {
        card.classList.add("highlight");
        card.classList.remove("dim");
        if (!firstMatch) firstMatch = card;
      } else if (keyword) {
        card.classList.add("dim");
        card.classList.remove("highlight");
      } else {
        card.classList.remove("highlight", "dim");
      }
    });

    if (firstMatch) firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  navSearch.addEventListener('input', (e) => runSearch(e.target.value));

  // Filter sidebar functionality
  const openBtn = document.getElementById('openSidebar');
  const closeBtn = document.getElementById('closeSidebar');
  const sidebar = document.getElementById('filterSidebar');
  const overlay = document.getElementById('overlay');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('show');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
});

// Listen for storage changes from wishlist page
window.addEventListener('storage', (e) => {
  if (e.key === 'wishlist') {
    updateWishlistCount();
    
    // Update heart icons based on new wishlist state
    const updatedWishlist = getWishlistFromStorage();
    document.querySelectorAll('.artsy-card').forEach(card => {
      const img = card.querySelector('img');
      const likeIcon = card.querySelector('.like-icon');
      const heartIcon = likeIcon.querySelector('i');
      
      const isLiked = updatedWishlist.some(item => 
        (item.imgSrc || item.img) === img.src
      );
      
      if (isLiked) {
        likeIcon.classList.add('liked');
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
      } else {
        likeIcon.classList.remove('liked');
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
      }
    });
  }
});

// Update count when page becomes visible
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateWishlistCount();
  }
});

// Make functions available globally
window.removeFromWishlist = removeFromWishlist;

// Testimonial carousel auto-slide
let testimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

function showNextTestimonial() {
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  testimonialSlides[testimonialIndex].classList.add('active');
}

testimonialSlides[0].classList.add('active');
const testimonialInterval = setInterval(showNextTestimonial, 2000);

const testimonialContainer = document.querySelector('.testimonial-carousel');
if (testimonialContainer) {
  testimonialContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  
  testimonialContainer.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(showNextTestimonial, 5000);
  });
}



// Automatic fill the newsletter email
document.addEventListener("DOMContentLoaded", () => {
  // prefill email from localStorage if available
  const savedEmail = localStorage.getItem("email");
  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
  }
});



// Footer newsletter email only
function sendEmail(e){
    e.preventDefault();
    const para= {
        Name: document.getElementById("username").innerText,
        email: document.getElementById("email").value,
    }
    const serviceID="service_gc6z3ld";
    const templateID="template_6p9239p";
    emailjs.send(serviceID,templateID,para).then(res=>{
        document.getElementById("subs").value = "Subscribed";
    })
    .catch(err=>console.log(err));
}
document.getElementById("footer-newsletter").addEventListener("submit", sendEmail);


