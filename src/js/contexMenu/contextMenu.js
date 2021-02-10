import { createElement } from '../data/createElement.js';

const mainBody = document.querySelector('.body');

export const contextMenu = (posX, posY) => {
  // eslint-disable-next-line no-shadow
  let contextMenuWrapper = document.querySelector('.contextmenu-wrapper');
  const contextMenuWrapperOn = document.querySelector('.contextmenu-wrapper-on');
  const bgArray = ['image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg'];

  if (contextMenuWrapper && !contextMenuWrapperOn) {
    contextMenuWrapper.classList.add('contextmenu-wrapper-on')
  }

  if (contextMenuWrapper && contextMenuWrapperOn) {
    contextMenuWrapper.classList.remove('contextmenu-wrapper-on')
  }

  if (!contextMenuWrapper) {
    contextMenuWrapper = createElement('div', mainBody, 'contextmenu-wrapper');
    const bgTheme = createElement('p', contextMenuWrapper, 'contextmenu-title');
    const bgList = createElement('ul', contextMenuWrapper, 'contextmenu-list');
    for (let i = 0; i < bgArray.length; i++) {
      const bgItem = createElement('li', bgList, 'contextmenu-item');
      bgItem.style.backgroundImage = `url(./assets/images/common/image-${i + 1}.jpg)`
    }

    bgList.addEventListener('click', (event) => {
      const localSettings = localStorage.getItem('settings');
      const currSettings = JSON.parse(localSettings);
      const bgListOn = document.querySelectorAll('.contextmenu-item');
      const bgListArray = [];
      bgListOn.forEach(item => {
        bgListArray.push(item);
      })
      const imageIndex = bgListArray.indexOf(event.target);
      currSettings.mainBg = bgArray[imageIndex];
      let bgPreImg = document.querySelector('.preimage-wrapper');
      if (bgPreImg) {
        bgPreImg.remove();
      }
      bgPreImg = createElement('div', mainBody, 'preimage-wrapper');
      bgPreImg.style.backgroundImage = `url("./assets/images/common/image-${imageIndex + 1}.jpg")`
      bgPreImg.classList.add('preimage-wrapper-on');
      setTimeout(() => {
        mainBody.style.backgroundImage = `url("./assets/images/common/image-${imageIndex + 1}.jpg")`;
      }, 1000);
      setTimeout(() => {
        bgPreImg.remove();
      }, 1500)
      localStorage.setItem('settings', JSON.stringify(currSettings))
    })


    bgTheme.textContent = 'change your bg-theme'
  }
  contextMenuWrapper.style.left = `${posX}px`;
  contextMenuWrapper.style.top = `${posY}px`;
}

export default contextMenu;