export const initTheme = () => {
  const bodyApp = document.querySelector('.body');
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const defaultTheme = 'dark';
  if (currSettings) {
    const appTheme = currSettings.theme;
    bodyApp.classList.add(appTheme)
  } else {
    bodyApp.classList.add(defaultTheme)
  }
};

export const initBackground = () => {
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const mainBody = document.querySelector('.body');
  mainBody.style.backgroundImage = `url('./assets/images/common/${currSettings.mainBg}')`
}

export default initTheme;