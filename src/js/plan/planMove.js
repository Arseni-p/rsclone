import { planDayView } from './planDayView.js';

export const planMove = () => {
  let localSettings = localStorage.getItem('settings');
  let currSettings = JSON.parse(localSettings);
  let posCount = parseInt(currSettings.currDay);
  const planList = document.querySelector('.plan-list');
  const planItems = document.querySelectorAll('.plan-item');
  const planPage = document.querySelector('.plan-page');
  const planLeftBtn = document.querySelector('.pretrain-move-left');
  const planRightBtn = document.querySelector('.pretrain-move-right');
  const minCount = 1;
  const maxCount = 30;
  const firstMoveX = 300;
  let moveX = 320;

  function movePlanX(moveLeftBtn, moveRightBtn) {
    localSettings = localStorage.getItem('settings');
    currSettings = JSON.parse(localSettings);
    if (posCount < parseInt(currSettings.currDay)) posCount = parseInt(currSettings.currDay);
    const checkedDayHeight = document.querySelector('.checked-day-height');
    if (checkedDayHeight) checkedDayHeight.classList.remove('checked-day-height');

    if (moveLeftBtn && (posCount >= minCount && posCount < maxCount)) {
      posCount++;
    }
    if (moveRightBtn && (posCount <= maxCount && posCount > minCount)) {
      posCount--
    }

    planItems[posCount - 1].classList.add('checked-day-height');

    return planList.style.left = `calc(50% - ${firstMoveX / 2}px - ${moveX * (posCount - 1)}px)`;
  }

  planPage.addEventListener('click', (event) => {
    event.preventDefault();
    const moveLeftBtn = event.target.closest('.pretrain-move-left');
    const moveRightBtn = event.target.closest('.pretrain-move-right');
    movePlanX(moveLeftBtn, moveRightBtn);
  })

  document.addEventListener('keydown', (event) => {
    let moveLeftBtn = false;
    let moveRightBtn = false;
    if (event.key === 'ArrowLeft') moveLeftBtn = true;
    if (event.key === 'ArrowRight') moveRightBtn = true;
    movePlanX(moveLeftBtn, moveRightBtn);
  })
  
  let arrForIndex = [];
  planItems.forEach(item => { arrForIndex.push(item) })
  planDayView(planList, arrForIndex);
  const btnPrePage = document.querySelector('.btn-prepage');
}

export default planMove;