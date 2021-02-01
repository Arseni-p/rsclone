import { createElement } from '../data/createElement.js';
import { planData } from '../data/planData.js';

export const planDayView = (planList, arrForIndex) => {
  const mainBody = document.querySelector('.body');
  planList.addEventListener('click', (event) => {
    const localSettings = localStorage.getItem('settings');
    const currSettings = JSON.parse(localSettings);
    const workoutDay = event.target.closest('.plan-item');
    const relaxDay = event.target.closest('.relax-item');
    const planIndex = arrForIndex.indexOf(workoutDay);

    if (relaxDay) {
      console.log('relaxDay', relaxDay);
      relaxDay.classList.add('relax-signal');
    }

    if (workoutDay && !relaxDay) {
    const planDayBlackout = createElement('div', mainBody, 'planday-blackout');
    const planDayWrapper = createElement('div', mainBody, 'planday-wrapper');
    planDayBlackout.classList.remove('planday-blackout-off');
    planDayBlackout.classList.add('planday-blackout-on');
    setTimeout(() => {
      planDayWrapper.classList.remove('planday-wrapper-off');
      planDayWrapper.classList.add('planday-wrapper-on')
    }, 700)
    const planDayContent = createElement('div', planDayWrapper, 'planday-content');
    const planDayHeader = createElement('div', planDayContent, 'planday-header');
    const planDayHeaderWrapper = createElement('div', planDayHeader, 'planday-header-wrapper');
    const btnPrePage = createElement('div', planDayHeaderWrapper, 'btn-prepage');
    const plandayLevelRate = createElement('p', planDayHeaderWrapper, 'plan-header-level levels-rate');
    plandayLevelRate.classList.add(`${currSettings.level}-rate`);
    const plandayLevelTitle = createElement('p', planDayHeaderWrapper, 'planday-title');
    plandayLevelTitle.innerHTML = `<span class="planday-level">${currSettings.level}</span>&nbsp;&ndash;&nbsp;<span class="planday-day">${planIndex + 1} day</span>`;
    const plandayTiming = createElement('p', planDayHeaderWrapper, 'planday-timing');
    const currProgram = currSettings.program;
    const currWorkoutDay = planData[currProgram][0][planIndex];
    console.log('planIndex', currWorkoutDay)
    const currRest = 20;
    const oneMinute = 60;
    let workoutTime = currRest * (currWorkoutDay.length - 1);
    currWorkoutDay.forEach(item => {
      workoutTime += +(item.time);
    })
    const workoutTotal = currWorkoutDay.length;
    plandayTiming.innerHTML = `<span class="planday-timing">${Math.floor(workoutTime / oneMinute)} min ${workoutTime % oneMinute} sec</span>&nbsp;&ndash;&nbsp;<span class="planday-day">${workoutTotal} workouts</span>`;
    const plandayListWrapper = createElement('div', planDayContent, 'planday-list-wrapper');
    
    const startBtn = createElement('button', plandayListWrapper, 'start-btn btn btn-outline-light');
    startBtn.textContent = 'Start';

    const plandayList = createElement('ul', plandayListWrapper, 'planday-list');
    for (let i = 0; i < currWorkoutDay.length; i++) {
      let timeMin = Math.floor(+(currWorkoutDay[i].time) / oneMinute);
      let timeSec = +(currWorkoutDay[i].time) % oneMinute;
      if (timeMin < 10) timeMin = `0${timeMin}`;
      if (timeSec === 0) timeSec = `0${timeSec}`;
      const plandayItem = createElement('li', plandayList, 'planday-item');
      const plandayItemWrapper = createElement('div', plandayItem, 'planday-item-wrapper');
      const plandayItemText = createElement('div', plandayItemWrapper, 'planday-item-text');
      const plandayItemImage = createElement('div', plandayItemWrapper, 'planday-item-image');
      plandayItemImage.style.backgroundImage = `url('./assets/images/plan/plank/${currWorkoutDay[i].image}')`;
      const plandayItemName = createElement('p', plandayItemText, 'planday-item-name');
      plandayItemName.textContent = `${currWorkoutDay[i].name}`
      const plandayItemTime = createElement('p', plandayItemText, 'planday-item-time');
      plandayItemTime.innerHTML = `<span class="planday-item-min">${timeMin}</span>&nbsp;:&nbsp;<span class="planday-item-sec">${timeSec}</span>`;
    }
   } 
  })
};

export const btnBackPlanday = (planDayWrapper, planDayBlackout) => {
  planDayWrapper.classList.remove('planday-wrapper-on');
  planDayWrapper.classList.add('planday-wrapper-off');
  setTimeout(() => {
    planDayBlackout.classList.remove('planday-blackout-on');
    planDayBlackout.classList.add('planday-blackout-off');
  }, 500);

  setTimeout(() => {
    planDayWrapper.remove();
    planDayBlackout.remove();
  }, 1000)
};

export const startWorkout = (planDayWrapper) => {
  console.log('startuem!!!');
  planDayWrapper.style.display = 'none'
}

export default planDayView;