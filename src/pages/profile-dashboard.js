import { clearCurrentUser, getCurrentUser } from '../state/auth-state.js';

const profiles = {
	teacher: { title: 'Área do professor', role: 'Professor' },
	admin: { title: 'Área administrativa', role: 'Administrador' },
};

export default function renderProfileDashboard(profile) {
	const user = getCurrentUser();
	const currentProfile = profiles[profile];

	return `<main class="flex min-h-screen items-center justify-center bg-[#f8faf7] px-5 py-10 font-[Inter,ui-sans-serif,system-ui] text-[#17251b]">
		<section class="w-full max-w-lg rounded-2xl border border-[#e1e9e0] bg-white p-8 shadow-[0_8px_30px_rgba(23,37,27,0.025)]">
			<img src="/logo.svg" alt="AcademyX" class="mb-10 h-10 w-[196px] object-contain object-left" />
			<p class="text-xs font-semibold uppercase tracking-[0.04em] text-green-700">${currentProfile.role}</p>
			<h1 class="mt-2 text-2xl font-semibold">${currentProfile.title}</h1>
			<p class="mt-3 text-sm text-[#69776d]">Olá, ${user.name}. Seu acesso foi autenticado com o perfil de ${currentProfile.role.toLowerCase()}.</p>
			<button type="button" data-logout class="mt-8 h-11 cursor-pointer rounded-[10px] bg-[#16a34a] px-5 text-sm font-semibold text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">Sair</button>
		</section>
	</main>`;
}

export function bindProfileDashboard(root) {
	root.querySelector('[data-logout]')?.addEventListener('click', () => {
		clearCurrentUser();
		window.location.hash = '/login';
	});
}