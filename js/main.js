document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // LOGIN / REGISTER MODAL LOGIC
  // ---------------------------------------------------------------------------

  const authModal = document.getElementById('authModal');
  const openLogin = document.getElementById('openModalLogin');
  const closeLogin = document.getElementById('form-close');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const switchLinks = document.querySelectorAll('.switch-form');

  openLogin.addEventListener('click', () => {
    authModal.classList.add('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  });

  closeLogin.addEventListener('click', () => {
    authModal.classList.remove('active');
  });

  switchLinks.forEach((link) => {
    link.addEventListener('click', () => {
      loginForm.classList.remove('active');
      registerForm.classList.remove('active');

      const target = link.dataset.target;
      document.getElementById(target).classList.add('active');
    });
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginForm.reset();
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    registerForm.reset();
  });

  loginForm.classList.add('active');

  // ---------------------------------------------------------------------------
  // NAVBAR, SEARCH, MENU
  // ---------------------------------------------------------------------------

  const searchBtn = document.querySelector('#search-btn');
  const searchBar = document.querySelector('.search-bar-container');
  const menu = document.querySelector('#menu-bar');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
  });

  searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
  });

  menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  });

  // ---------------------------------------------------------------------------
  // VIDEO + MUSIC SYNC LOGIC
  // ---------------------------------------------------------------------------

  const videoBtns = document.querySelectorAll('.vid-btn');
  const videoSlider = document.getElementById('video-slider');
  const audio = document.getElementById('myMusic');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentIndex = 0;
  let homeActive = true;

  function playVideoAndMusic(index) {
    videoBtns.forEach((b) => b.classList.remove('active'));
    videoBtns[index].classList.add('active');

    const newVideo = videoBtns[index].dataset.src;
    const newMusic = videoBtns[index].dataset.music;

    videoSlider.src = newVideo;
    audio.src = newMusic;

    videoSlider.play();
    audio.play();
  }

  videoBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      currentIndex = i;
      playVideoAndMusic(i);
    });
  });

  audio.addEventListener('ended', () => {
    if (!homeActive) return;

    currentIndex = (currentIndex + 1) % videoBtns.length;
    playVideoAndMusic(currentIndex);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const section = link.getAttribute('href');

      if (section !== '#home') {
        audio.pause();
        audio.currentTime = 0;
        homeActive = false;
      } else {
        homeActive = true;
        audio.play();
      }
    });
  });

  playVideoAndMusic(currentIndex);

  // Pause media on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      videoSlider.pause();
      audio.pause();
    } else {
      if (homeActive) {
        videoSlider.play();
        audio.play();
      }
    }
  });

  // ---------------------------------------------------------------------------
  // SWIPER SLIDERS
  // ---------------------------------------------------------------------------

  new Swiper('.review-slider', {
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  new Swiper('.brand-slider', {
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    breakpoints: {
      450: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      991: { slidesPerView: 4 },
      1200: { slidesPerView: 5 },
    },
  });

  // ---------------------------------------------------------------------------
  // PACKAGES – SHOW MORE / LESS
  // ---------------------------------------------------------------------------

  const morePackage = document.querySelector('.btnForMore');
  const hiddenCards = document.querySelectorAll('.hidden');
  const packagesSection = document.getElementById('packages');

  morePackage.addEventListener('click', () => {
    hiddenCards.forEach((c) => c.classList.toggle('hidden'));

    const expanding = morePackage.textContent === 'More Package';
    morePackage.textContent = expanding ? 'Less Package' : 'More Package';

    if (!expanding) {
      packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ---------------------------------------------------------------------------
  // GALLERY – SHOW MORE / LESS
  // ---------------------------------------------------------------------------

  const moreGallery = document.querySelector('.moreGallery');
  const hiddenGallery = document.querySelectorAll('.hide-gallery');
  const gallerySection = document.getElementById('gallery');

  moreGallery.addEventListener('click', () => {
    hiddenGallery.forEach((card) => card.classList.toggle('hide-gallery'));

    const expanding = moreGallery.textContent === 'More Gallery';
    moreGallery.textContent = expanding ? 'Less Gallery' : 'More Gallery';

    if (!expanding) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ---------------------------------------------------------------------------
  // BOOK SECTION POPUP MODAL (FIXED)
  // ---------------------------------------------------------------------------

  const bookSection = document.getElementById('book');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const closeBtn = document.getElementById('closeBtn');

  let modalClosed = false;

  function checkBookSectionCenter() {
    if (modalClosed) return;

    const rect = bookSection.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const mid = window.innerHeight / 2;

    if (center > mid - 100 && center < mid + 100) {
      modal.style.display = 'flex';
    } else {
      modal.style.display = 'none';
    }
  }

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalClosed = true;
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalClosed = true;
  });

  window.addEventListener('scroll', checkBookSectionCenter);

  // ---------------------------------------------------------------------------
  // PASSENGER COUNTER
  // ---------------------------------------------------------------------------

  function calculateTotal() {
    const getValue = (id) => parseInt(document.getElementById(id).value) || 0;

    const total =
      getValue('seniorCitizen') +
      getValue('pwd') +
      getValue('adult') +
      getValue('children') +
      getValue('infants');

    const totalInput = document.getElementById('totalPassenger');
    totalInput.value = total;
  }

  calculateTotal();
});

// Stars Rating Functionality
