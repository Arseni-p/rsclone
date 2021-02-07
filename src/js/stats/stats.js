import { createElement } from '../data/createElement.js';

export const stats = () => {
  const totalDays = 30;
  const statsDaysMargin = 10;
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const statsPageWrapper = document.querySelector('.stats-wrapper');
  const statsWorkoutWrapper = statsPageWrapper.querySelector('.stats-workout-wrapper');
  const workoutTotal = statsWorkoutWrapper.querySelector('.workout-stats-total');
  const kkalTotal = statsWorkoutWrapper.querySelector('.kkal-stats-total');
  const durationTotal = statsWorkoutWrapper.querySelector('.duration-stats-total');
  workoutTotal.textContent = currSettings.workoutsTotal;
  kkalTotal.textContent = currSettings.kkalTotal;
  const currTime = +(currSettings.durTotal);
  let timeMin = Math.floor(currTime / 60);
  let timeSec = currTime % 60;
  if (timeMin < 10) timeMin = `0${timeMin}`;
  if (timeSec < 10) timeSec = `0${timeSec}`;
  durationTotal.textContent = `${timeMin} : ${timeSec}`;
  const statsDaysListWrapper = document.querySelector('.stats-dayslist-wrapper'); 
  const statsDaysList = document.querySelector('.stats-days-list');
  const currLevel = document.querySelector('.stats-level-value');
  currLevel.textContent = currSettings.level;

  for (let i = 1; i <= totalDays; i++) {
    const statsDayItem = createElement('li', statsDaysList, 'stats-days-item');
    statsDayItem.textContent = i;
    if (i === +(currSettings.currDay)) {statsDayItem.classList.add('stats-currday')};
    if (i < +(currSettings.currDay)) {statsDayItem.classList.add('stats-doneday')}
  }

  const daysItem = document.querySelector('.stats-days-item');
  const actualCurrDay = document.querySelector('.stats-currday');
  statsDaysList.style.width = `${(daysItem.offsetWidth + statsDaysMargin) * totalDays}px`;

  if ( actualCurrDay.offsetLeft > statsDaysListWrapper.offsetWidth ) {
    actualCurrDay.scrollIntoView({block: "center", behavior: "smooth"})
  }

  const userWeight = document.querySelector('.user-weight');
  const userHeight = document.querySelector('.user-height');
  const userGender = document.querySelector('.user-gender');
  userWeight.textContent = currSettings.weight;
  userHeight.textContent = currSettings.height;
  userGender.textContent = currSettings.gender;

  const bmiValue = document.querySelector('.bmi-value');
  bmiValue.textContent = currSettings.bmi;
  const bmiList = document.querySelector('.bmi-list');
  const bmiGradation = ['Below normal weight', 'Normal weight', 'Overweight', 'Obesity 1 degree', 'Obesity 2 degree', 'Obesity 3 degree'];
  const bmiClasses = ['very-low', 'low', 'medium', 'hight', 'very-hight', 'extra-hight'];
  let bmiIndex;
  if (+(currSettings.bmi) < 16) bmiIndex = 0;
  if (+(currSettings.bmi) >= 16 && +(currSettings.bmi) < 18.5) bmiIndex = 1;
  if (+(currSettings.bmi) >= 18.5 && +(currSettings.bmi) < 25) bmiIndex = 2;
  if (+(currSettings.bmi) >= 25 && +(currSettings.bmi) < 30) bmiIndex = 3;
  if (+(currSettings.bmi) >= 30 && +(currSettings.bmi) < 35) bmiIndex = 4;
  if (+(currSettings.bmi) >= 35) bmiIndex = 5;

  for (let i = 0; i < bmiGradation.length; i++) {
    const bmiItem = createElement('li', bmiList, 'bmi-item');
    bmiItem.classList.add(bmiClasses[i]);
    if (i === bmiIndex) bmiItem.textContent = currSettings.bmi;
  }

  const bmiTitle = document.querySelector('.bmi-text-value');
  console.log(bmiTitle)
  bmiTitle.textContent = bmiGradation[bmiIndex]


  actualCurrDay.addEventListener('click', () => {
    const statsActive = document.querySelector('.active');
    const planLink = document.querySelector('.plan-link');
    statsActive.classList.remove('active');
    planLink.classList.add('active');
    location.hash = '#plan'}
  )
}