export const initTheme = () => {
  const bodyApp = document.querySelector('.body');
  let localSettings = localStorage.getItem('settings');
  let currSettings = JSON.parse(localSettings);
  const defaultTheme = 'dark';
  if (currSettings) {
    const appTheme = currSettings.theme;
    bodyApp.classList.add(appTheme)
  } else {
    bodyApp.classList.add(defaultTheme)
  }
};

export const initBackground = (settings) => {
  const mainBody = document.querySelector('.body');
  mainBody.style.backgroundImage = `url('./assets/images/common/${settings.gender}-${settings.program}.jpg')`
}

export default initTheme;