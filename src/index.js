/* eslint-disable no-restricted-globals */

import { preloader } from './js/preloader/preloader.js';
import { initTheme } from './js/init/initTheme.js';
import { navbarOn } from './js/menu/navbarOn.js';
import { initPlan } from './js/init/initPlan.js';
import { planMove } from './js/plan/planMove.js';
import { initSubpage } from './js/init/initSubpage.js';
import { btnBackPlanday , startWorkout , exitWorkout } from './js/plan/planDayView.js';


import { finishPlanDay } from './js/plan/finishPlanDay.js';
import { stats } from './js/stats/stats.js';
import { initSettings } from './js/init/initSettings.js';
import { contextMenu } from './js/contexMenu/contextMenu.js';
import { keysDown } from './js/keysDown/keysDown.js';
import { initActive } from './js/init/initActive.js';
import { challenges } from './js/challenges/challenge.js';
// eslint-disable-next-line import/no-unresolved
import { playSound } from './js/audioApi/audioAPI.js';
 
document.body.onload = () => {
  preloader();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  navbarOn();
  initSubpage();

  setTimeout(() => {
    if (location.hash === '#plan') {
      initPlan();
      planMove();
    };

    if (location.hash === '#stats') {
      stats();
    };

    if (location.hash === '#program') {
      challenges();
    }
  }, 100)
})

function locationHashChanged() {
  initActive();
  setTimeout(() => {
    if (location.hash === '#plan') {
      initPlan();
      planMove();
    };

    if (location.hash === '#stats') {
      stats();
    };

    if (location.hash === '#program') {
      challenges();
    }

  }, 500);

  initSubpage();
}

window.onhashchange = locationHashChanged;


document.addEventListener('click', (event) => {
  const btnPrePage = event.target.closest('.btn-prepage');
  const startBtn = event.target.closest('.start-btn');
  const exitBtn = event.target.closest('.exit-btn');
  const levelPlan = event.target.closest('.level-plan');
  const settingsLink = event.target.closest('.settings-link');
  const challengeLink = event.target.closest('.challenge-level');

  const finishLine = document.querySelector('.finish-line');

  const planDayWrapper = document.querySelector('.planday-wrapper');
  const planDayBlackout = document.querySelector('.planday-blackout')

  if (btnPrePage) {
    btnBackPlanday(planDayWrapper, planDayBlackout);
  }

  if (startBtn) {
    startWorkout(planDayWrapper);
  }

  if (exitBtn) {
    exitWorkout();
  }

  if (finishLine) {
    finishPlanDay(finishLine, planDayWrapper, planDayBlackout);
  }

  if (levelPlan) {
    const totalDays = 30;
    // eslint-disable-next-line no-unused-vars
    const levelsList = document.querySelectorAll('.level-plan');
    const lastLevel = document.querySelector('.checked-level');
    const lastDaysLeft = lastLevel.querySelector('.days-left');
    const progressLine = lastLevel.querySelector('.level-progress-on');
    const levelName = levelPlan.querySelector('.levels-name');
    lastDaysLeft.textContent = totalDays;
    progressLine.style.width = `0%`;
    lastLevel.classList.remove('checked-level');
    levelPlan.classList.add('checked-level');
    const localSettings = localStorage.getItem('settings');
    const currSettings = JSON.parse(localSettings);
    currSettings.currDay = 1;
    currSettings.level = levelName.textContent.toLowerCase();
    console.log(currSettings.currDay, currSettings.level)
    localStorage.setItem('settings', JSON.stringify(currSettings));
    const planWrapper = document.querySelector('.plan-wrapper');
    planWrapper.innerHTML = '';
    initPlan();
    planMove()
  }

  if (settingsLink) {
    initSettings();
  }

  if (challengeLink) {
    location.hash = '#program';
  }
});

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  const posX = event.clientX;
  const posY = event.clientY;
  contextMenu(posX, posY);
});

window.addEventListener('keydown', (event) => {
  const key = event.keyCode;
  keysDown(key);
})

window.addEventListener('mouseover', (event) => {
  if (event.target.closest('a') || event.target.closest('.plan-pretrain-btn')) {
    const playItem = 'a-link';
    playSound(playItem);
  }
})

