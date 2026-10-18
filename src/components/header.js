import { clearCurrentUser } from '../state/auth-state.js';

const iconPaths = {
	building: '<path d="M3 21h18M5 21V7l7-4v18m7 0V11l-7-4"/><path d="M9 9v.01M9 12v.01M9 15v.01M15 13v.01M15 16v.01"/>',
	grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
	book: '<path d="M12 7v14m0-14C10.5 5.5 8.5 5 3 5v14c5.5 0 7.5.5 9 2m0-14c1.5-1.5 3.5-2 9-2v14c-5.5 0-7.5.5-9 2"/>',
	trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/>',
	chat: '<path d="M21 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L3 20l1.8-4.2A7 7 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s9 2.9 9 7Z"/>',
	bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0"/>',
	search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
	timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6m-3 0v3"/>',
	moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
	logout: '<path d="M10 17l5-5-5-5m5 5H3m9-9h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6"/>',
};

const icon = (name, className = 'block size-5 shrink-0') => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;

export function renderThemeToggle(className = 'flex min-h-7 cursor-pointer items-center gap-2.5 border-b border-[#e0e8df] pb-3 max-[640px]:w-full max-[640px]:justify-center max-[640px]:gap-2 max-[640px]:pb-2', labelClassName = 'max-[640px]:hidden') {
	return `<label class="${className}" title="Alternar tema claro ou escuro">${icon('moon', 'block size-4 shrink-0')}<span class="${labelClassName}" data-theme-label>Tema claro</span><input class="peer sr-only" type="checkbox" data-theme-toggle aria-label="Ativar tema escuro"><span class="relative ml-auto inline-flex h-4 w-7 shrink-0 rounded-full bg-[#d5dfd5] transition-colors after:absolute after:left-[2px] after:top-[2px] after:size-3 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-[#8b5cf6] peer-checked:after:translate-x-3 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#8b5cf6] max-[640px]:ml-0" aria-hidden="true"></span></label>`;
}

export function renderStudentSidebar(activePage = 'dashboard') {
    const navLink = (page, label, iconName, href) => {
        const active = activePage === page;
        return `<a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] ${active ? 'bg-[#dcfce7] font-semibold text-[#078337]' : 'text-[#68766c]'} px-[11px] text-xs max-[640px]:justify-center max-[640px]:px-0" href="${href}" ${active ? 'aria-current="page"' : ''} aria-label="${label}">${icon(iconName, 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">${label}</span></a>`;
    };

    return `<aside class="fixed inset-y-0 left-0 z-20 flex w-[232px] flex-col overflow-y-auto border-r border-[#e0e8df] bg-white px-[17px] py-[25px] max-[760px]:w-[190px] max-[760px]:px-3 max-[640px]:w-16 max-[640px]:items-center max-[640px]:px-1.5 max-[640px]:py-3" aria-label="Navegação principal">
        <a class="mb-[34px] flex h-[52px] cursor-pointer items-center max-[640px]:mb-5 max-[640px]:h-10" href="#/student/dashboard" aria-label="AcademyX, dashboard"><img class="h-[52px] w-[196px] object-contain object-left max-[760px]:w-[165px] max-[640px]:hidden" src="/logo.svg" data-logo-light="/logo.svg" data-logo-dark="/logo-dark.svg" alt="AcademyX — Aprender é avançar"><span class="hidden text-lg font-bold tracking-tight text-[#078337] max-[640px]:block">AX</span></a>
        
        <div class="flex min-h-14 items-center gap-2.5 rounded-[11px] border border-[#e0e8df] bg-[#f8faf7] px-2.5 py-[9px] text-[#637168] max-[640px]:min-h-10 max-[640px]:w-10 max-[640px]:justify-center max-[640px]:p-0">
            ${icon('building', 'block size-[18px] shrink-0')}
            <span class="max-[640px]:hidden"><strong class="block text-[11px] font-semibold text-[#243027]">Instituto Horizonte</strong><small class="mt-[3px] block text-[10px]">2º semestre · 2026</small></span>
        </div>
        
        <div class="mb-2 mt-[29px] text-[9px] font-semibold text-[#68766c] max-[640px]:hidden">ESPAÇO DE APRENDIZAGEM</div>
        
        <nav class="grid w-full gap-1 max-[640px]:mt-3">
            ${navLink('dashboard', 'Dashboard', 'grid', '#/student/dashboard')}
            ${navLink('focus', 'Foco', 'timer', '#/student/focus')}
            ${navLink('discipline', 'Disciplinas', 'book', '#/student/discipline')}
            ${navLink('ranking', 'Ranking', 'trophy', '#/student/ranking')}
            <a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] px-[11px] text-xs text-[#68766c] max-[640px]:justify-center max-[640px]:px-0" href="#" aria-disabled="true" aria-label="Fórum de dúvidas">${icon('chat', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Fórum de dúvidas</span></a>
        </nav>
        
        <div class="mt-[21px] grid gap-[5px] rounded-2xl border border-[#e0e8df] p-[15px] max-[640px]:hidden">
            <strong class="text-[11px] font-semibold">Área do aluno</strong>
            <span class="text-[10px] text-[#68766c]">Estude, avance e conquiste XP.</span>
        </div>
        
        <div class="mt-auto grid gap-[13px] text-[11px] text-[#68766c] max-[640px]:w-full max-[640px]:justify-items-center">
			${renderThemeToggle()}
            <a class="cursor-pointer text-inherit hover:text-green-800 hover:underline max-[640px]:hidden" href="#" aria-disabled="true">Central de ajuda</a>
            <a class="cursor-pointer text-inherit hover:text-green-800 hover:underline max-[640px]:hidden" href="#/login">Sair da conta</a>
            <a class="hidden cursor-pointer text-[#68766c] max-[640px]:block" href="#/login" aria-label="Sair da conta">${icon('logout', 'block size-[19px] shrink-0')}</a>
            <small class="mt-[5px] text-[9px] max-[640px]:hidden">AcademyX © 2026 · Feito para evoluir</small>
        </div>
    </aside>`;
}

export function renderStudentHeader(pageLabel = 'Dashboard') {
	return `<header class="z-10 flex h-[88px] min-h-[88px] items-center justify-between gap-6 border-b border-[#e2e9e1] bg-white px-8 max-[1100px]:px-4 max-[760px]:h-[70px] max-[760px]:min-h-[70px] max-[760px]:gap-3 max-[760px]:px-4 max-[640px]:h-14 max-[640px]:min-h-14 max-[640px]:px-3">
		<div class="whitespace-nowrap text-xs max-[640px]:hidden">Aluno / ${pageLabel}</div><div class="flex items-center gap-[23px] max-[760px]:gap-[9px]">
			<label class="flex h-10 w-[308px] items-center gap-2.5 rounded-[11px] border border-[#e0e8df] bg-[#f8faf7] px-[11px] text-[#68766c] max-[1100px]:w-[min(210px,34vw)]"><span class="pointer-events-none">${icon('search', 'block size-[17px] shrink-0')}</span><input class="w-full min-w-0 bg-transparent text-xs text-[#19241c] outline-none placeholder:text-[#68766c]" type="search" placeholder="Buscar na plataforma..." aria-label="Buscar na plataforma"></label>
			<button class="grid h-8 w-[30px] cursor-pointer place-items-center border-0 border-r border-[#e0e8df] bg-transparent pr-[18px] text-[#68766c] max-[760px]:hidden" type="button" aria-label="Notificações">${icon('bell', 'block size-[21px] shrink-0')}</button><div class="flex items-center gap-2.5 whitespace-nowrap"><span class="grid size-9 place-items-center rounded-full bg-[#dcfce7] text-[10px] font-semibold text-[#078337]">LO</span><span class="max-[760px]:hidden"><strong class="block text-[11px] font-semibold">Lucas Oliveira</strong><small class="mt-0.5 block text-[9px] text-[#68766c]">Aluno</small></span></div>
		</div>
	</header>`;
}

export function bindStudentShell(root) {
	bindThemeToggle(root);
	root.querySelectorAll('[aria-disabled="true"]').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
	root.querySelectorAll('a[href="#/login"]').forEach((link) => link.addEventListener('click', (event) => {
		event.preventDefault();
		clearCurrentUser();
		window.location.hash = '/login';
	}));
}

export function bindThemeToggle(root) {
	const toggle = root.querySelector('[data-theme-toggle]');
	const label = root.querySelector('[data-theme-label]');
	const logo = root.querySelector('[data-logo-light]');
	if (!toggle) return;
	let isDark = false;
	try { isDark = localStorage.getItem('academyx-theme') === 'dark'; } catch {}
	const applyTheme = () => {
		root.dataset.theme = isDark ? 'dark' : 'light';
		toggle.checked = isDark;
		if (logo) logo.src = isDark ? logo.dataset.logoDark : logo.dataset.logoLight;
		if (label) label.textContent = isDark ? 'Tema escuro' : 'Tema claro';
		toggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
	};
	toggle.addEventListener('change', () => {
		isDark = toggle.checked;
		try { localStorage.setItem('academyx-theme', isDark ? 'dark' : 'light'); } catch {}
		applyTheme();
	});
	applyTheme();
}
