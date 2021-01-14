import { createElement } from './js/views/createElement';

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

const router = async () => {
  const routes = [
    { path: '/src/index.html', view: () => console.log('Viewing Index') },
    { path: '/src/programm.html', view: () => console.log('Viewing Programm') },
    { path: '/src/plan.html', view: () => console.log('Viewing Plan') },
    { path: '/src/stats.html', view: () => console.log('Viewing Stats') },
    { path: '/src/settings.html', view: () => console.log('Viewing Settings') },
  ];

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  });
  let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch)
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    }
  }
  console.log('111', match.route.view());
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href)
    }
  })
  router()
})