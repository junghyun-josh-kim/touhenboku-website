const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const container = document.querySelector('.home__slide__album');

btn1.addEventListener('click', () => {
  container.style.transform = 'translate(0vw)';
});

btn2.addEventListener('click', () => {
  container.style.transform = 'translate(-100vw)';
});

btn3.addEventListener('click', () => {
  container.style.transform = 'translate(-200vw)';
});
