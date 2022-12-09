// Modulos
import InitPage from './assets/js/InitPage';

// Estilos
import './assets/scss/index.scss';

(() => {
  const app = document.getElementById('app_content');

  if (app) {
    console.log(`%c${document.title} loaded`, 'color:green;font-size:15px');

    // Anything else
    window.addEventListener('load', InitPage, true);
  }
})();
