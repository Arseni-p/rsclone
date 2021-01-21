export const initTheme = () => {
  const bodyApp = document.querySelector('.body');
  let localSettings = localStorage.getItem('settings');
  let currSettings = JSON.parse(localSettings);
  const defaultTheme = 'dark';
  const appTheme = currSettings.theme;
  if (appTheme) {
    bodyApp.classList.add(appTheme)
  } else {
    bodyApp.classList.add(defaultTheme)
  }

}

export default initTheme;