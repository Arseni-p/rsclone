import { createElement } from '../data/createElement.js';
import { planData } from '../data/planData.js';

export const initPlan = () => {
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const plankRecord = document.querySelector('.plank-record');
  if (isNaN(+(currSettings.bestRecord))) {
    plankRecord.textContent = currSettings.bestRecord;
  } else {
    let recordMin = Math.floor(+(currSettings.bestRecord) / 60);
    let recordSec = +(currSettings.bestRecord) % 60; 
    if (recordMin < 10) recordMin = `0${recordMin}`;
    if (recordSec < 10) recordSec = `0${recordSec}`;
    plankRecord.textContent = `${recordMin} : ${recordSec}`;
  }
  const levelsBtns = document.querySelectorAll('.level-plan');
  let planWrapper = document.querySelector('.plan-wrapper');
  if (!planWrapper) {
    planWrapper = document.querySelector('.plan-wrapper');
    document.location.reload();
  }
  const planListWrapper = createElement('div', planWrapper, 'plan-list-wrapper');
  const planList = createElement('ul', planListWrapper, 'plan-list');
  const trainCount = 0;
  const totalDays = 30;
  let planItemWidth = 300;
  const firstPlanItemWidth = 300;
  const currLevel = currSettings.level;
  const levels = ['beginner', 'medium', 'advanced'];
  const currLevelIndex = levels.indexOf(currLevel);
  const levelsProgress = document.querySelectorAll('.level-progress-on');
  const daysLeft = document.querySelectorAll('.days-left');
  levelsBtns[currLevelIndex].classList.add('checked-level');
  daysLeft[currLevelIndex].textContent = +(daysLeft[currLevelIndex].textContent) - (+(currSettings.currDay) - 1);
  levelsProgress[currLevelIndex].style.width = `${Math.ceil(+(currSettings.currDay - 1)/totalDays*100)}%`;
  const planArray = planData[currLevelIndex];
  const rest = 20;
  const hour = 60;
  const relaxDay = 'relaxation';

  for (let i = 1; i <= totalDays; i++) {
    let workoutTime = 0;
    const planItem = createElement('li', planList, 'plan-item');
    const itemTitle = createElement('h4', planItem, 'item-title');
    itemTitle.textContent = `${currSettings.level}`;
    const itemDay = createElement('p', planItem, 'item-day');
    itemDay.textContent = `${i} day`;
    const itemCountWrapper = createElement('div', planItem, 'item-count-wrapper');
    const totalTime = createElement('p', itemCountWrapper, 'total-time');
    const totalWorkout = createElement('p', itemCountWrapper, 'total-workout');    
    planArray[i-1].forEach(item => {
      workoutTime += +(item.time);
    })
    workoutTime += ((planArray[i-1].length - 1) * rest);
    const minTrain = Math.floor(workoutTime / hour);
    const secTrain = workoutTime % hour;
    totalTime.textContent = `${minTrain} min ${secTrain} sec - `;
    totalWorkout.textContent = `${planArray[i-1].length} workouts`;
    const imageWrapper = createElement('p', planItem, 'image-wrapper');
    const preTrainBtn = createElement('button', planItem, 'pretrain-btn');
    preTrainBtn.setAtributte = ('type', 'button');
    preTrainBtn.textContent = 'go';
    preTrainBtn.classList.add('btn');
    preTrainBtn.classList.add('btn-outline-light');
    if (planArray[i-1][0].name === relaxDay) {
      itemCountWrapper.innerHTML =`let's rest today`;
      preTrainBtn.textContent = `you need a rest`;
      imageWrapper.classList.add('relax-day');
      planItem.classList.add('relax-item');
    }
    if (i === parseInt(currSettings.currDay)) {
      planItem.classList.add('current-day');
      planItem.classList.add('checked-day-height');
    }
    if (i < parseInt(currSettings.currDay)) {
      planItem.classList.add('done-day');
      preTrainBtn.textContent = 'complete';
    }
  }

  if (parseInt(currSettings.currDay) > 1) planItemWidth = 320;
  planList.style.left = `calc(50% - ${firstPlanItemWidth / 2}px - ${planItemWidth * (parseInt(currSettings.currDay) - 1)}px)`;
}