import { createElement } from '../data/createElement.js';
import { planData } from '../data/planData.js';

export const planDayView = (planList, arrForIndex) => {
  const mainBody = document.querySelector('.body');
  planList.addEventListener('click', (event) => {
    const localSettings = localStorage.getItem('settings');
    const currSettings = JSON.parse(localSettings);
    const workoutDay = event.target.closest('.plan-item');
    const planIndex = arrForIndex.indexOf(workoutDay);
    const planDayBlackout = createElement('div', mainBody, 'planday-blackout');
    const planDayWrapper = createElement('div', mainBody, 'planday-wrapper');
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
    const currRest = 20;
    const oneMinute = 60;
    let workoutTime = currRest * (currWorkoutDay.length - 1);
    currWorkoutDay.forEach(item => {
      workoutTime += +(item.time);
    })
    const workoutTotal = currWorkoutDay.length;
    plandayTiming.innerHTML = `<span class="planday-timing">${Math.floor(workoutTime / oneMinute)} min ${workoutTime % oneMinute} sec</span>&nbsp;&ndash;&nbsp;<span class="planday-day">${workoutTotal} workouts</span>`;
    const plandayListWrapper = createElement('ul', planDayContent, 'planday-list-wrapper');
    const plandayList = createElement('ul', plandayListWrapper, 'planday-list');
    for (let i = 0; i < currWorkoutDay.length; i++) {
      const timeMin = Math.floor(+(currWorkoutDay[i].time) / oneMinute);
      const timeSec = +(currWorkoutDay[i].time) % oneMinute;
      const plandayItem = createElement('li', plandayList, 'planday-item');
      const plandayItemText = createElement('div', plandayItem, 'planday-item-text');
      const plandayItemImage = createElement('div', plandayItem, 'planday-item-image');
      const plandayItemName = createElement('p', plandayItemText, 'planday-item-name');
      plandayItemName.textContent = `${currWorkoutDay[i].name}`
      const plandayItemTime = createElement('p', plandayItemText, 'planday-item-time');
      const plandayTimeMin = createElement('span', plandayItemTime, 'planday-item-min');
      const plandayTimeSec = createElement('span',plandayItemTime, 'planday-item-min');
      plandayTimeMin.textContent = `${timeMin} : `;
      plandayTimeSec.textContent = `${timeSec}`;
      

    }

    //console.log('planItems', workoutDay, curIndex)
  })
}

export default planDayView;