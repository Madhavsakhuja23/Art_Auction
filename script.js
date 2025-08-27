// search functionality for navbar

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

navSearch.addEventListener('input', (e) => runSearch(e.target.value));


// Listen for typing in navbar search
navSearch.addEventListener('input', (e) => {
  runSearch(e.target.value);
});

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
  window.location.href="home.html";
});

const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebar = document.getElementById('filterSidebar');
const overlay = document.getElementById('overlay');

const searchInput = document.querySelector('.filter-search input');

searchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();
  console.log("Searching for:", keyword);
  // Here, you’d filter your artwork grid based on title, artist, etc.
});


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
// Show the popup after 5 seconds
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



// heart pop up when double tapped

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

// js for auction page 

document.addEventListener("DOMContentLoaded", function () {
  // Tab switching
  document.querySelectorAll(".breadcrumb-tab").forEach(tab => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      document.querySelectorAll(".breadcrumb-tab").forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      // Hide all carousel wrappers
      document.querySelectorAll(".carousel-wrapper").forEach(c => c.classList.remove("active"));

      // Show the selected carousel
      const category = this.getAttribute("data-category"); // "curators" or "trending"
      const target = document.getElementById(`${category}-carousel`);
      if (target) {
        target.classList.add("active");
      }
    });
  });

  // Mouse-based scrolling for carousel
  document.querySelectorAll('.carousel-track').forEach(track => {
    let isMouseInside = false;

    track.addEventListener('mouseenter', () => isMouseInside = true);
    track.addEventListener('mouseleave', () => isMouseInside = false);

    track.addEventListener('mousemove', (e) => {
      if (!isMouseInside) return;
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const scrollX = (x / rect.width) * track.scrollWidth - rect.width / 2;
      track.scrollLeft = scrollX;
    });
  });
});

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
        document.getElementById("subs").value="Subscribed";
    })
    .catch(err=>console.log(err));
}

document.getElementById("footerForm").addEventListener("submit", sendEmail);
