'use strict';

export const navbarOn = () => {
  let activeItem;
  const navbarBtn = document.querySelector('.navbar-toggler');
  const navbar = document.querySelector('.navbar');
  const menuItems = document.querySelectorAll('.navbar-item');
  const settingsLink = document.querySelector('.settings-link');
  const navbarList = document.querySelector('.navbar-collapse');
  const menuHash = ['#main', '#program', '#plan', '#stats'];


  const menuOnOff = () => {
    if ( !navbarList.classList.contains('menu-on') ) {
      navbarList.classList.remove('menu-off')
      navbarList.classList.add('menu-on')      
    } else {
      navbarList.classList.remove('menu-on');
      navbarList.classList.add('menu-off');

      setTimeout(() => {
        navbarList.classList.remove('menu-off')
      }, 1100)
    }
  }
  

  menuItems.forEach(item => {item.classList.remove('active')});
  if (location.hash !== '') {
    const index = menuHash.indexOf(location.hash);
    menuItems[index].classList.add('active');
  } else {
    menuItems[0].classList.add('active');
  }

  navbar.addEventListener('click', (event) => {
    const currItem = event.target.closest('.navbar-item');
    if (currItem && !event.target.classList.contains('active')) {
      const activeItem = navbar.querySelector('.active');
      activeItem.classList.remove('active');
      currItem.classList.add('active');
      if (navbarList.classList.contains('menu-on')) {
        navbarList.classList.remove('menu-on');
        navbarList.classList.add('menu-off');
  
        setTimeout(() => {
          navbarList.classList.remove('menu-off')
        }, 1100)
      }
    } 
  });


  settingsLink.addEventListener('click', (event) => {
    event.preventDefault()
  });

  navbarBtn.addEventListener('click', () => {
    menuOnOff();
  })
}