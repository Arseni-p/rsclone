

export const preloader = () => {
  const preloaderItem = document.querySelector('.preloader');

  setTimeout(() => {
    preloaderItem.classList.add('done')
  }, 5000)
}

export default preloader;