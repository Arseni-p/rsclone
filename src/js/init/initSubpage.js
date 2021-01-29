export const initSubpage = () => {
  const pageName = document.querySelector('.subpage');
  const tabletWidth = 991;

  if (document.documentElement.clientWidth <= tabletWidth && location.hash.slice(1) !== 'main') {
    pageName.innerHTML = `&nbsp;/&nbsp;${location.hash.slice(1)}`
  }

  if (location.hash.slice(1) === 'main') {
    pageName.innerHTML = '';
  }
  
  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth <= tabletWidth && location.hash.slice(1) !== 'main') {
      pageName.innerHTML = `&nbsp;/&nbsp;${location.hash.slice(1)}`
    }
  
    if (location.hash.slice(1) === 'main') {
      pageName.innerHTML = '';
    }
  })
}