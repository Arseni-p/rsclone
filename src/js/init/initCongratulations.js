import { createElement } from "../data/createElement.js";
import { planData } from '../data/planData.js'; 

export const initCongrat = (currWorkout, dayNumber, levels) => {
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  currWorkout.classList.add('current-workout-congrat');
  const congratHeader = createElement('div', currWorkout, 'congrat-header');
  const congratDayWrapper = createElement('div', congratHeader, 'congrat-day-wrapper');
  const day = createElement('p', congratDayWrapper, 'congrat-day');
  const textComplete = createElement('p', congratDayWrapper, 'congrat-day-text');
  day.innerHTML = `<span class="congrat-day-value">${dayNumber}</span> day`;
  textComplete.textContent = 'complete';
  const cupImage = createElement('div', congratHeader, 'cup-image');
  setTimeout(() => {
    cupImage.classList.add('cup-image-on');
    congratDayWrapper.classList.add('congrat-day-wrapper-on')
  }, 10) 
  // eslint-disable-next-line no-unused-vars
  const congratImage = createElement('div', currWorkout, 'congrat-image');
  const congratInfo = createElement('div', currWorkout, 'congrat-info-wrapper');
  const infoList = createElement('ul', congratInfo, 'congrat-info-list');
  const finishLineWrapper = createElement('div', currWorkout, 'finish-line-wrapper');
  // eslint-disable-next-line no-unused-vars
  const finishLine = createElement('div', finishLineWrapper, 'finish-line');
  const planIndex = localStorage.getItem('planIndex');
  const currLevel = currSettings.level;
  const currLevelIndex = levels.indexOf(currLevel);
  const currWorkoutDay = planData[currLevelIndex][planIndex];
  const workoutTotal = currWorkoutDay.length;
  let timeCount = 0;
  currWorkoutDay.forEach(item => {
    timeCount += +(item.time)
  });
  const kkalCount = 0.15;
  const kkalTotal = (kkalCount * timeCount).toFixed(2);
  let timeMin = Math.floor(timeCount / 60);
  let timeSec = timeCount % 60;
  if (timeMin < 10) timeMin = `0${timeMin}`;
  if (timeSec < 10) timeSec = `0${timeSec}`
  const timeTotal = `${timeMin} : ${timeSec}`;
  const infoArray = [workoutTotal, kkalTotal, timeTotal];
  const infoArrayText = ['workouts', 'kkal', 'duration'];
  for (let i = 0; i < infoArray.length; i++) {
    const infoItem = createElement('li', infoList, 'congrat-info-item');
    infoItem.innerHTML = `<span class="info-value">${infoArray[i]}</span><span class="info-text">${infoArrayText[i]}</span>`
  }

  let workoutsCurrTotal = +(currSettings.workoutsTotal);
  let kkalCurrTotal = +(currSettings.kkalTotal);
  let durTotal = +(currSettings.durTotal);
  workoutsCurrTotal += +(workoutTotal);
  kkalCurrTotal += +(kkalTotal);
  // eslint-disable-next-line no-unused-vars
  durTotal += timeCount;
  currSettings.workoutsTotal = workoutsCurrTotal;
  currSettings.kkalTotal = kkalCurrTotal;
  currSettings.durTotal = timeCount;
  localStorage.setItem('settings', JSON.stringify(currSettings));
}

export default initCongrat;