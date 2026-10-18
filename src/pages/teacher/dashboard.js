import renderProfileDashboard, { bindProfileDashboard } from '../profile-dashboard.js';

export default function renderTeacherDashboard() {
	return renderProfileDashboard('teacher');
}

export function bindTeacherDashboard(root) {
	bindProfileDashboard(root);
}
