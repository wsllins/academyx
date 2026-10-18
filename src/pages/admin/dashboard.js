import renderProfileDashboard, { bindProfileDashboard } from '../profile-dashboard.js';

export default function renderAdminDashboard() {
	return renderProfileDashboard('admin');
}

export function bindAdminDashboard(root) {
	bindProfileDashboard(root);
}
