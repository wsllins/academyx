import renderLogin, { bindLoginInteractions } from '../pages/login.js';

const routes = {
	'/login': renderLogin,
	'/': renderLogin,
};

export function startRouter(root) {
	const renderRoute = () => {
		const path = window.location.hash.slice(1) || '/login';
		const renderPage = routes[path] ?? renderLogin;
		root.innerHTML = renderPage();
		bindLoginInteractions(root);
	};

	if (!window.location.hash) {
		window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/login`);
	}

	window.addEventListener('hashchange', renderRoute);
	renderRoute();
}
