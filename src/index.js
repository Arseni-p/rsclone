'use strict';
import { preloader } from './js/preloader/preloader.js';
import { initTheme } from './js/init/initTheme.js';
import { navbarOn } from './js/menu/navbarOn.js';
import { planData } from './js/data/planData.js';
import { initPlan } from './js/init/initPlan.js';
import { planMove } from './js/plan/planMove.js';
import { initSubpage } from './js/init/initSubpage.js';
import { btnBackPlanday } from './js/plan/planDayView.js';
import { startWorkout } from './js/plan/planDayView.js';
import { exitWorkout } from './js/plan/planDayView.js';
//import { initConfetti } from './js/views/confetti.js';


//initConfetti();

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


document.addEventListener('click', (event) => {
  const btnPrePage = event.target.closest('.btn-prepage');
  const startBtn = event.target.closest('.start-btn');
  const exitBtn = event.target.closest('.exit-btn');
  const finishBtn = event.target.closest('.finish-btn');

  const planDayWrapper = document.querySelector('.planday-wrapper');
 
  if (btnPrePage) {
    const planDayBlackout = document.querySelector('.planday-blackout')
    btnBackPlanday(planDayWrapper, planDayBlackout);
  }

  if (startBtn) {
    startWorkout(planDayWrapper);
  }

  if (exitBtn) {
    exitWorkout();
  }
    console.log(event)

  if (finishBtn) {
  }
})

