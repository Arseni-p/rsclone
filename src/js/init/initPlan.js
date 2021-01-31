import { createElement } from '../data/createElement.js';
import { planData } from '../data/planData.js';

export const initPlan = () => {
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const planWrapper = document.querySelector('.plan-wrapper');
  while (!planWrapper) {
    console.log('reload', planWrapper)
    planWrapper = document.querySelector('.plan-wrapper');
    document.location.reload();
  }
  const planListWrapper = createElement('div', planWrapper, 'plan-list-wrapper');
  const planList = createElement('ul', planListWrapper, 'plan-list');
  const trainCount = 0;
  const totalDays = 30;
  const planItemWidth = 300;
  const firstPlanItemWidth = 300;
  const currProgram = currSettings.program;
  const planArray = planData[currProgram][0];
  const rest = 20;
  const hour = 60;

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

    
    if (i === parseInt(planData.currDay)) {
      planItem.classList.add('current-day');
      planItem.classList.add('checked-day-height');
    }

    if (parseInt(planData.currDay) > 1) planItemWidth = 320;

    planList.style.left = `calc(50% - ${firstPlanItemWidth / 2}px - ${planItemWidth * (parseInt(planData.currDay) - 1)}px)`
   
     
  }
}