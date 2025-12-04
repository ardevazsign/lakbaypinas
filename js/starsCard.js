const ratings = JSON.parse(localStorage.getItem('packageRatings'));

document.querySelectorAll('.card').forEach((card) => {
  const id = card.getAttribute('data-id');
  const percentageText = card.querySelector('.percentage');
  const star = card.querySelector('.star');

  const rating = ratings?.[id] ?? 0; // if no rating, default 0

  percentageText.textContent = rating + '%';

  const brightness = 0.3 + (rating / 100) * 1.2;
  star.style.filter = `brightness(${brightness})`;
});
