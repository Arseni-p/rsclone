'use strict';
import { preloader } from './js/preloader/preloader.js';
import { initTheme } from './js/init/initTheme.js';
import { navbarOn } from './js/menu/navbarOn.js';
import { planData } from './js/data/planData.js';
import { initPlan } from './js/init/initPlan.js';
import { planMove } from './js/plan/planMove.js';
import { initSubpage } from './js/init/initSubpage.js';


console.log('planData - ', planData);

document.body.onload = () => {
  //preloader();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  navbarOn();
  initSubpage();

  setTimeout(() => {
    if (location.hash === '#plan') {
      initPlan();
      planMove();
    }
  }, 100)
})

const container = document.getElementById('app');
const navbar = document.querySelector('.navbar-nav');
let count = 0;


function locationHashChanged( e ) {

  if ( location.hash === "#stats" ) {
    container.innerHTML = ''
      const docs = document.createElement('p');
      
      container.append(docs);
      docs.textContent = 'as'
  };
  
  setTimeout(() => {
    if (location.hash === '#plan') {
      initPlan();
      planMove();
    }
  }, 1000);

  initSubpage();
}

window.onhashchange = locationHashChanged;
