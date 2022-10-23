// Landing page sliding banner

const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const container = document.querySelector('.home__slide__album');

yellowBtn1();
function yellowBtn1() {
  btn1.style.backgroundColor = '#edb518';
}

btn1.addEventListener('click', () => {
  container.style.transform = 'translate(0vw)';
  btn1.style.backgroundColor = '#edb518';
  btn2.style.backgroundColor = '';
  btn3.style.backgroundColor = '';
});

btn2.addEventListener('click', () => {
  container.style.transform = 'translate(-100vw)';
  btn1.style.backgroundColor = '';
  btn2.style.backgroundColor = '#edb518';
  btn3.style.backgroundColor = '';
});

btn3.addEventListener('click', () => {
  container.style.transform = 'translate(-200vw)';
  btn1.style.backgroundColor = '';
  btn2.style.backgroundColor = '';
  btn3.style.backgroundColor = '#edb518';
});

// Navbar toggle button for small screen

const navBarMenu = document.querySelector('.navbar__menu');
const navBarToggleBtn = document.querySelector('.navbar__toggle-btn');
navBarToggleBtn.addEventListener('click', () => {
  navBarMenu.classList.toggle('open');
});

// Google Map Style
function initMap() {
  const touhenboku = { lat: 43.711431629200284, lng: -79.39910137653287 };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: touhenboku,
    mapId: '253b09f4a17c73a2',
  });
  const marker = new google.maps.Marker({
    position: touhenboku,
    map: map,
  });
}

window.initMap = initMap;

// Scroll
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight * 1.5) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});
