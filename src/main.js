import './style.css';
import { startRouter } from './router/router.js';

const app = document.querySelector('#app');

if (app) {
    startRouter(app);
}