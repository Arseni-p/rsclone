export const challenges = () => {
  let localSettings = localStorage.getItem('settings');
  let currSettings = JSON.parse(localSettings);
  const recordBtn = document.querySelector('.record-btn');
  const timerBtn = document.querySelector('.timer-btn');
  const bestRecord = document.querySelector('.best-record');
  const recordMin = document.querySelector('.record-min');
  const recordSec = document.querySelector('.record-sec');
  const lastRecord = document.querySelector('.last-record');
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+(currSettings.bestRecord))) {
    bestRecord.textContent = currSettings.bestRecord;
  } else {
    let lastRecordMin = Math.floor(+(currSettings.bestRecord) / 60);
    let lastRecordSec = +(currSettings.bestRecord) % 60;
    if (lastRecordMin < 10) lastRecordMin = `0${lastRecordMin}`;
    if (lastRecordSec < 10) lastRecordSec = `0${lastRecordSec}`;
    bestRecord.textContent = `${lastRecordMin} : ${lastRecordSec}`;
  }
  let recordOn = false;
  let currMin = 0;
  let currSec = 0;

  recordBtn.addEventListener('click', () => {
    if (!recordBtn.classList.contains('stop-mode')) {
      recordBtn.classList.add('stop-mode');
      recordOn = true;
      currMin = 0;
      currSec = 0;
    } else {
      recordBtn.classList.remove('stop-mode');
      recordOn = false;
    }

    const recordTime = setInterval(() => {
      currSec++;
      if (currSec < 10) currSec = `0${currSec}`;
      if (currSec > 59) {
        currMin++;
        if (currMin < 10) currMin = `0${currMin}`;
        recordMin.textContent = currMin;
      }
      if (currSec === 60) {
        currSec = `00`;
      };
      
      recordSec.textContent = currSec;

      if (!recordOn) {
        currSec--;
        if (currSec < 10) currSec = `0${currSec}`;
        recordSec.textContent = currSec;
        clearInterval(recordTime);
        lastRecord.textContent = `${currMin} : ${currSec}`;
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(+(currSettings.bestRecord))) {
          currSettings.bestRecord = `${+(currMin) * 60 + +(currSec)}`;
          localStorage.setItem('settings', JSON.stringify(currSettings));
          localSettings = localStorage.getItem('settings');
          currSettings = JSON.parse(localSettings);
          let lastRecordMin = Math.floor(+(currSettings.bestRecord) / 60);
          let lastRecordSec = +(currSettings.bestRecord) % 60;
          if (lastRecordMin < 10) lastRecordMin = `0${lastRecordMin}`;
          if (lastRecordSec < 10) lastRecordSec = `0${lastRecordSec}`;
          bestRecord.textContent = `${lastRecordMin} : ${lastRecordSec}`;
        }

        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(+(currSettings.bestRecord))) {
          const totalCurrTime = `${+(currMin) * 60 + +(currSec)}`
          if (+(currSettings.bestRecord) < totalCurrTime) {
            currSettings.bestRecord = totalCurrTime;
            localStorage.setItem('settings', JSON.stringify(currSettings));
            let lastRecordMin = Math.floor(+(currSettings.bestRecord) / 60);
            let lastRecordSec = +(currSettings.bestRecord) % 60;
            if (lastRecordMin < 10) lastRecordMin = `0${lastRecordMin}`;
            if (lastRecordSec < 10) lastRecordSec = `0${lastRecordSec}`;
            bestRecord.textContent = `${lastRecordMin} : ${lastRecordSec}`;
          }
        }
      }
    }, 1000)

  });

  timerBtn.addEventListener('click', () => {
    recordBtn.classList.add('stop-mode')

  })
}

export default challenges;