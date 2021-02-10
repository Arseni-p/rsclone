import { createElement } from '../data/createElement.js';
import { planData } from '../data/planData.js';
import { initConfetti } from '../init/initConfetti.js';
import { initCongrat } from '../init/initCongratulations.js';
import { playSound } from '../audioAPI/audioAPI.js';

const mainBody = document.querySelector('.body');
const levels = ['beginner', 'medium', 'advanced'];


export const planDayView = (planList, arrForIndex) => {
  // const mainBody = document.querySelector('.body');
  planList.addEventListener('click', (event) => {
    const localSettings = localStorage.getItem('settings');
    const currSettings = JSON.parse(localSettings);
    const currRest = +(currSettings.rest);
    const workoutDay = event.target.closest('.plan-item');
    const relaxDay = event.target.closest('.relax-item');
    const planIndex = arrForIndex.indexOf(workoutDay);

    if (relaxDay) {
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
    // eslint-disable-next-line no-unused-vars
    const btnPrePage = createElement('div', planDayHeaderWrapper, 'btn-prepage');
    const plandayLevelRate = createElement('p', planDayHeaderWrapper, 'plan-header-level levels-rate');
    plandayLevelRate.classList.add(`${currSettings.level}-rate`);
    const plandayLevelTitle = createElement('p', planDayHeaderWrapper, 'planday-title');
    plandayLevelTitle.innerHTML = `<span class="planday-level">${currSettings.level}</span>&nbsp;&ndash;&nbsp;<span class="planday-day">${planIndex + 1} day</span>`;
    const plandayTiming = createElement('p', planDayHeaderWrapper, 'planday-timing');
    const currLevel = currSettings.level;
    const currLevelIndex = levels.indexOf(currLevel);
    const currWorkoutDay = planData[currLevelIndex][planIndex];
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
      if (timeSec === 0 || timeSec < 10) timeSec = `0${timeSec}`;
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
    localStorage.setItem('planIndex', planIndex);
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
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const planIndex = localStorage.getItem('planIndex');
  const currRest = +(currSettings.rest);
  const currLevel = currSettings.level;
  const currLevelIndex = levels.indexOf(currLevel);
  const currWorkoutDay = planData[currLevelIndex][planIndex];
  const planDayContent = document.querySelector('.planday-content');
  planDayContent.classList.add('display-off');
  let workoutCount = 0;
  const currWorkout = createElement('div', planDayWrapper, 'current-workout');
  let nextWorkoutBtn;

  // eslint-disable-next-line no-shadow
  function initCurrWorkout(currWorkoutDay) {
    const currWorkoutHeader = createElement('ul', currWorkout, 'header-total-list');
    for (let i = 0; i < currWorkoutDay.length; i++) {
      const headerItem = createElement('li', currWorkoutHeader, 'header-total-item');
      if (i <= workoutCount) {
        headerItem.classList.add('item-done');
      }
    }
    const exitBtn = createElement('div', currWorkout, 'exit-btn');
    currWorkout.style.backgroundImage = `url('./assets/images/plan/plank/${currWorkoutDay[workoutCount].image}')`;
  
    const timeLineWrapper = createElement('div', currWorkout, 'time-line-wrapper');
    let timeLine = createElement('div', timeLineWrapper, 'time-line');
    nextWorkoutBtn = createElement('button', timeLineWrapper, 'next-workout-btn');
    const workoutInfo = createElement('div', currWorkout, 'workout-info-wrapper');
    const workoutTimer = createElement('p', workoutInfo, 'workout-timer-wrapper');
    const workoutCurrTime = createElement('span', workoutTimer, 'workout-currtime');
    const workoutTimerSlash = createElement('span', workoutTimer, 'workout-slash');
    const workoutTotalTime = createElement('span', workoutTimer, 'workout-totaltime');
    const workoutName = createElement('p', workoutInfo, 'workout-name');
    workoutTimerSlash.innerHTML = `/`;
    workoutCurrTime.textContent = currWorkoutDay[workoutCount].time;
    workoutTotalTime.textContent = currWorkoutDay[workoutCount].time;
    workoutName.textContent = currWorkoutDay[workoutCount].name;
    let countdownValue = 3;
    const countdown = createElement('div', currWorkout, 'workout-countdown');
    countdown.classList.add('countdown-move');
    countdown.textContent = countdownValue;

    const preTimerOn = setInterval(() => {
      const timerSounds = ['one', 'two','three']
      if (countdownValue >= 0 && countdownValue < 4) {
        const playItem = timerSounds[countdownValue - 1];
        playSound(playItem)
      };
      countdownValue--;
      countdown.textContent = countdownValue;
      if (countdownValue === 0) {
        clearInterval(preTimerOn);
      }
    }, 1000);
    const preTimer = countdownValue * 1000;
    let workoutCurrTimer = +(currWorkoutDay[workoutCount].time);
    let timerOff = false;

    // eslint-disable-next-line no-shadow
    function currTimerOn(workoutCurrTimer) {
      nextWorkoutBtn.addEventListener('click', () => {
        // eslint-disable-next-line no-param-reassign
        workoutCurrTimer = 1;
      })
      const workoutTimerOn = setInterval(() => {
        if (timerOff) clearInterval(workoutTimerOn);
        // eslint-disable-next-line no-param-reassign
        workoutCurrTimer--;
        workoutCurrTime.textContent = workoutCurrTimer;
        if (workoutCurrTimer === 0 && workoutCount+1 < currWorkoutDay.length) {
          clearInterval(workoutTimerOn);
          timeLine.remove();
          nextWorkoutBtn.classList.add('next-rest-btn');
          const restOffBtn = document.querySelector('.next-rest-btn');
          restOffBtn.addEventListener('click', () => {
            // eslint-disable-next-line no-use-before-define
            clearInterval(restTimer);
            currWorkout.innerHTML = '';
            workoutCount++;
            restOffBtn.classList.remove('next-rest-btn');
            initCurrWorkout(currWorkoutDay);
          });
          currWorkout.style.backgroundImage = `url('./assets/images/common/icon-coffee.png')`;
          let restTime = currRest;
          workoutCurrTime.textContent = currRest;
          workoutTotalTime.textContent = currRest;
          workoutName.textContent = 'take a rest';
          timeLine = createElement('div', timeLineWrapper, 'time-line');
          setTimeout(() => {
            timeLine.classList.add('time-line-move');
            timeLine.style.transition = `width ${currRest}s linear`;
          }, 100)
          const restTimer = setInterval(() => {
            restTime--;
            workoutCurrTime.textContent = restTime;
            if (restTime === 0) {
              clearInterval(restTimer);
              currWorkout.innerHTML = '';
              workoutCount++;
              restOffBtn.classList.remove('next-rest-btn');
              initCurrWorkout(currWorkoutDay);
            }
          }, 1000);
        } 
        if (workoutCurrTimer === 0 && workoutCount+1 === currWorkoutDay.length) {
          clearInterval(workoutTimerOn);
          currWorkout.innerHTML = '';
          currWorkout.removeAttribute('style');
          const canvasArea = createElement('canvas', planDayWrapper, 'canvas-area');
          canvasArea.setAttribute('id', 'canvas');
          let dayNumber = +(currSettings.currDay)
          initCongrat(currWorkout, dayNumber, levels);
          dayNumber++;
          currSettings.currDay = dayNumber;
          const playItem = 'notbad-goodjob';
          playSound(playItem);
          initConfetti();
        }
      }, 1000)
    }

    exitBtn.addEventListener('click', () => {
      timerOff = true;
      workoutCurrTimer = false;
    })
    
    setTimeout(() => {
      timeLine.classList.add('time-line-move');
      timeLine.style.transition = `width ${currWorkoutDay[workoutCount].time}s linear`;
      countdown.remove();
      currTimerOn(workoutCurrTimer);
    }, preTimer);
  }
  initCurrWorkout(currWorkoutDay);
}

export const exitWorkout = () => {
  const currWorkout = document.querySelector('.current-workout');
  const planDayContent = document.querySelector('.display-off')
  currWorkout.remove();
  planDayContent.classList.remove('display-off');
}

export default planDayView;