export const initActive = () => {
  const navbarBrand = document.querySelector('.navbar-brand');
  const programLink = document.querySelector('.program-link');
  const planLink = document.querySelector('.plan-link');
  const statsLink = document.querySelector('.stats-link');
  const activeItem = document.querySelector('.active');
  activeItem.classList.remove('active');

  if (location.hash === '#' || location.hash === '#' || location.hash === '#main') navbarBrand.classList.add('active');
  if (location.hash === '#program') programLink.classList.add('active');
  if (location.hash === '#plan') planLink.classList.add('active');
  if (location.hash === '#stats') statsLink.classList.add('active');
} 


export default initActive;