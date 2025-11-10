let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');

let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

const videoSlider = document.querySelector('.myVideo');
const audio = document.getElementById('myMusic');
const homeSection = document.getElementById('home');

let videoBtn = document.querySelectorAll('.vid-btn');
const navLinks = document.querySelectorAll('.nav-link');

let currentIndex = 0; // Track which video/music is playing
let homeActive = true; // Track if user is in home section

window.onscroll = () => {
  searchBtn.classList.remove('fa-times');
  searchBar.classList.remove('active');
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  loginForm.classList.remove('active');
};

menu.addEventListener('click', () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
  searchBtn.classList.toggle('fa-times');
  searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
  loginForm.classList.add('active');
});
formClose.addEventListener('click', () => {
  loginForm.classList.remove('active');
});

videoBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.controls .active').classList.remove('active');
    btn.classList.add('active');
    let src = btn.getAttribute('data-src');
    document.querySelector('#video-slider').src = src;
  });
});

// Slider

var swiper = new Swiper('.review-slider', {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
// Brand Swiper
var swiper = new Swiper('.brand-slider', {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    991: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});

// --------------------------------------------------------------------

videoBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    videoBtn.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Change video source
    const newVideo = btn.getAttribute('data-src');
    videoSlider.src = newVideo;
    videoSlider.play();

    // Change music source and play it
    const newMusic = btn.getAttribute('data-music');
    audio.src = newMusic;
    audio.play();
  });
});

// observer.observe(homeSection);
function playVideoAndMusic(index) {
  videoBtn.forEach((b) => b.classList.remove('active'));
  videoBtn[index].classList.add('active');

  const newVideo = videoBtn[index].getAttribute('data-src');
  const newMusic = videoBtn[index].getAttribute('data-music');

  videoSlider.src = newVideo;
  videoSlider.play();

  audio.src = newMusic;
  audio.play();
}

// Manual control click
videoBtn.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    currentIndex = i;
    playVideoAndMusic(currentIndex);
  });
});

// When music ends → go to next video/music
audio.addEventListener('ended', () => {
  if (!homeActive) return; // If user left home, do nothing

  currentIndex = (currentIndex + 1) % videoBtn.length; // loop back to start
  playVideoAndMusic(currentIndex);
});

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetSection = link.getAttribute('href');
    if (targetSection !== '#home') {
      audio.pause();
      audio.currentTime = 0; // Reset the song to the beginning
    } else {
      // Optional: play music again when returning to Home
      audio.play();
      homeActive = true;
      playVideoAndMusic(currentIndex);
    }
  });
});

// Start first video/music on page load
playVideoAndMusic(currentIndex);

//  Send Email From Contact Section

//------------------------ Hide and show packages -----------------------
// Packages
const morePackage = document.querySelector('.btnForMore');
const hiddenCards = document.querySelectorAll('.hidden');
const packagesSection = document.getElementById('packages');

morePackage.addEventListener('click', () => {
  hiddenCards.forEach((card) => {
    card.classList.toggle('hidden');
  });
  const isExpanding = morePackage.textContent === 'More Package';
  morePackage.textContent = isExpanding ? 'Less Package' : 'More Package';

  // If collapsing (Less Video), scroll to top of the section
  if (!isExpanding) {
    packagesSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
});
// Gallery

const moreGallery = document.querySelector('.moreGallery');
const hiddenBox = document.querySelectorAll('.hide-gallery');
const gallerySection = document.getElementById('gallery');

moreGallery.addEventListener('click', () => {
  hiddenBox.forEach((card) => {
    card.classList.toggle('hide-gallery');
  });
  const isExpanding = moreGallery.textContent === 'More Package';
  moreGallery.textContent = isExpanding ? 'Less Package' : 'More Package';

  // If collapsing (Less Video), scroll to top of the section
  if (!isExpanding) {
    gallerySection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
});
