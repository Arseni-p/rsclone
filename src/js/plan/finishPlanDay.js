import { btnBackPlanday } from '../plan/planDayView.js';

export const finishPlanDay = (finishLine, planDayWrapper, planDayBlackout) => {
  finishLine.classList.add('finish-line-on');
  const lineMoveTime = 5;
  finishLine.style.transition = `width ${lineMoveTime}s ease-in-out`;
  setTimeout(() => {
    btnBackPlanday(planDayWrapper, planDayBlackout);
  }, lineMoveTime*1000);
    
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const planIndex = +(localStorage.getItem('planIndex'));
  let currDayIndex = +(currSettings.currDay);
  const planItems = document.querySelectorAll('.plan-item');
  const planBtns = document.querySelectorAll('.pretrain-btn');
  const planList = document.querySelector('.plan-list');
  const daysLeft = document.querySelectorAll('.days-left');
  const totalDays = 30;
  const firstPlanItemWidth = 300;
  let planItemWidth = 300;
  planItems[planIndex].classList.add('done-day');
  planBtns[planIndex].textContent = 'done';

  if (planIndex + 1 === currDayIndex) {
    const doneDay = document.querySelector('.current-day');
    doneDay.className = 'plan-item';
    doneDay.classList.add('done-day');
    planItems[currDayIndex].classList.add('current-day');
    planItems[currDayIndex].classList.add('checked-day-height');
    const currLevel = currSettings.level;
    const levels = ['beginner', 'medium', 'advanced'];
    const currLevelIndex = levels.indexOf(currLevel);
    const levelsProgress = document.querySelectorAll('.level-progress-on');
    console.log(levelsProgress[currLevelIndex]);
    levelsProgress[currLevelIndex].style.width = `${Math.ceil(currDayIndex / totalDays * 100)}%`;
    currDayIndex++;
    daysLeft[currLevelIndex].textContent = +(daysLeft[currLevelIndex].textContent) - 1;
    if (currDayIndex > 1) planItemWidth = 320;
    planList.style.left = `calc(50% - ${firstPlanItemWidth / 2}px - ${planItemWidth * (currDayIndex - 1)}px)`;
    currSettings.currDay = currDayIndex;
    localStorage.setItem('settings', JSON.stringify(currSettings));
  }
}

export default finishPlanDay;