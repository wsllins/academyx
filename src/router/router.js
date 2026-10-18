import renderLogin, { bindLoginInteractions } from '../pages/login.js';
import renderStudentDashboard, { bindStudentDashboard } from '../pages/student/dashboard.js';
import { renderStudentDisciplinePage, bindStudentDisciplinePage } from '../pages/student/discipline.js';
import renderStudentFocus, { bindStudentFocus } from '../pages/student/focus.js';
import renderStudentRanking, { bindStudentRanking } from '../pages/student/ranking.js';
import renderTeacherDashboard, { bindTeacherDashboard } from '../pages/teacher/dashboard.js';
import renderAdminDashboard, { bindAdminDashboard } from '../pages/admin/dashboard.js';
import { getCurrentUser } from '../state/auth-state.js';


const homeRoutes = {
	student: '/student/dashboard',
	teacher: '/teacher/dashboard',
	admin: '/admin/dashboard',
};

const routes = {
	'/student/dashboard': { render: renderStudentDashboard, bind: bindStudentDashboard, role: 'student' },
	'/student/discipline': { render: renderStudentDisciplinePage, bind: bindStudentDisciplinePage, role: 'student' },
	'/student/focus': { render: renderStudentFocus, bind: bindStudentFocus, role: 'student' },
	'/student/ranking': { render: renderStudentRanking, bind: bindStudentRanking, role: 'student' },
	'/teacher/dashboard': { render: renderTeacherDashboard, bind: bindTeacherDashboard, role: 'teacher' },
	'/admin/dashboard': { render: renderAdminDashboard, bind: bindAdminDashboard, role: 'admin' },
};

export function startRouter(root) {
	const renderRoute = () => {
		const user = getCurrentUser();
		let path = window.location.hash.slice(1) || '/';

		if (path === '/' || path === '/login') {
			path = user ? homeRoutes[user.role] ?? '/login' : '/login';
		} else if (routes[path]) {
			if (!user) path = '/login';
			else if (user.role !== routes[path].role) path = homeRoutes[user.role] ?? '/login';
		} else {
			path = user ? homeRoutes[user.role] ?? '/login' : '/login';
		}

		const expectedHash = `#${path}`;
		if (window.location.hash !== expectedHash) {
			window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${expectedHash}`);
		}

		const route = routes[path];
		root.innerHTML = route ? route.render() : renderLogin();
		if (route) route.bind(root);
		else bindLoginInteractions(root);
	};

    window.addEventListener('hashchange', renderRoute);
    renderRoute();
}