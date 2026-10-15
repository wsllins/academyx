import renderLogin, { bindLoginInteractions } from '../pages/login.js';
import renderStudentDashboard, { bindStudentDashboard } from '../pages/student/dashboard.js';

const routes = {
	'/login': renderLogin,
	'/': renderLogin,
	'/student/dashboard': renderStudentDashboard,
};

export function startRouter(root) {
	const renderRoute = () => {
		const path = window.location.hash.slice(1) || '/login';
		const renderPage = routes[path] ?? renderLogin;
		root.innerHTML = renderPage();
		if (path === '/student/dashboard') {
			bindStudentDashboard(root);
		} else {
			bindLoginInteractions(root);
		}
	};

	if (!window.location.hash) {
		window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/login`);
	}

	window.addEventListener('hashchange', renderRoute);
	renderRoute();
}
