'use strict';

export const preloader = () => {
  const preloaderItem = document.querySelector('.preloader');

  setTimeout(() => {
    preloaderItem.classList.add('done')
  }, 100)//5000)
}