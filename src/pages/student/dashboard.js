import { renderStudentHeader, renderStudentSidebar, bindStudentShell } from '../../components/header.js';

const iconPaths = {
	building: '<path d="M3 21h18M5 21V7l7-4v18m7 0V11l-7-4"/><path d="M9 9v.01M9 12v.01M9 15v.01M15 13v.01M15 16v.01"/>',
	grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
	book: '<path d="M12 7v14m0-14C10.5 5.5 8.5 5 3 5v14c5.5 0 7.5.5 9 2m0-14c1.5-1.5 3.5-2 9-2v14c-5.5 0-7.5.5-9 2"/>',
	trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/>',
	chat: '<path d="M21 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L3 20l1.8-4.2A7 7 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s9 2.9 9 7Z"/>',
	bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0"/>',
	search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
	play: '<path d="m7 4 13 8-13 8V4Z"/>',
	checklist: '<path d="m3 6 2 2 4-4m4 2h8M3 14l2 2 4-4m4 2h8m-8 4h8"/>',
	timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6m-3 0v3"/>',
	calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
	logout: '<path d="M10 17l5-5-5-5m5 5H3m9-9h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6"/>',
	chevronLeft: '<path d="m15 18-6-6 6-6"/>',
	chevronRight: '<path d="m9 18 6-6-6-6"/>',
	playCircle: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/>',
	file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6m-11 5h6m-6 4h6"/>',
};

const icon = (name, className = 'block size-5 shrink-0') => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;

const sessions = [
	['11 out. · 10:00', 'Biologia', 'checklist', 'Resolução de questões', '20 questões · Genética mendeliana', '1h 00min'],
	['10 out. · 09:30', 'Biologia', 'playCircle', 'Videoaulas', 'Herança e leis de Mendel', '1h 00min'],
	['09 out. · 16:30', 'Biologia', 'file', 'Leitura / revisão', 'Resumo de genética', '30min'],
	['09 out. · 14:00', 'Português', 'file', 'Leitura / revisão', 'Estratégias de interpretação', '1h 00min'],
	['08 out. · 15:00', 'Português', 'playCircle', 'Videoaulas', 'Interpretação de texto', '1h 00min'],
	['07 out. · 16:00', 'Português', 'checklist', 'Resolução de questões', '20 questões · Interpretação de texto', '1h 00min'],
	['07 out. · 10:00', 'Matemática', 'file', 'Leitura / revisão', 'Raízes, vértice e gráfico', '1h 00min'],
	['06 out. · 14:00', 'Matemática', 'playCircle', 'Videoaulas', 'Funções do 2º grau', '1h 30min'],
	['05 out. · 09:00', 'Matemática', 'checklist', 'Resolução de questões', '40 questões · Funções do 2º grau', '2h 00min'],
];

const detailRows = [
	['Matemática', 'Prof. Helena Lima', '2h 00min', '1h 30min', '1h 00min', '4h 30min'],
	['Português', 'Prof. Camila Rocha', '1h 00min', '1h 00min', '1h 00min', '3h 00min'],
	['Biologia', 'Prof. Bruno Mendes', '1h 00min', '1h 00min', '30min', '2h 30min'],
];

const questionAccuracy = [
	{ subject: 'Biologia', correct: 15, total: 20, accuracy: 75, barWidth: 'w-3/4' },
	{ subject: 'Matemática', correct: 32, total: 40, accuracy: 80, barWidth: 'w-4/5' },
	{ subject: 'Português', correct: 17, total: 20, accuracy: 85, barWidth: 'w-[85%]' },
];

function sidebar() {
	return `<aside class="fixed inset-y-0 left-0 z-20 flex w-[232px] flex-col border-r border-[#e0e8df] bg-white px-[17px] py-[25px] max-[760px]:w-[190px] max-[760px]:px-3 max-[640px]:w-16 max-[640px]:items-center max-[640px]:px-1.5 max-[640px]:py-3" aria-label="Navegação principal">
		<a class="mb-[34px] flex h-[52px] cursor-pointer items-center max-[640px]:mb-5 max-[640px]:h-10" href="#/student/dashboard" aria-label="AcademyX, dashboard">
			<img class="h-[52px] w-[196px] object-contain object-left max-[760px]:w-[165px] max-[640px]:hidden" src="/logo.svg" alt="AcademyX — Aprender é avançar">
			<span class="hidden text-lg font-bold tracking-tight text-[#078337] max-[640px]:block">AX</span>
		</a>
		<div class="flex min-h-14 items-center gap-2.5 rounded-[11px] border border-[#e0e8df] bg-[#f8faf7] px-2.5 py-[9px] text-[#637168] max-[640px]:min-h-10 max-[640px]:w-10 max-[640px]:justify-center max-[640px]:p-0">
			${icon('building', 'block size-[18px] shrink-0')}
			<span class="max-[640px]:hidden"><strong class="block text-[11px] font-semibold text-[#243027]">Instituto Horizonte</strong><small class="mt-[3px] block text-[10px]">2º semestre · 2026</small></span>
		</div>
		<div class="mb-2 mt-[29px] text-[9px] font-semibold text-[#68766c] max-[640px]:hidden">ESPAÇO DE APRENDIZAGEM</div>
		<nav class="grid w-full gap-1 max-[640px]:mt-3">
			<a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] bg-[#dcfce7] px-[11px] text-xs font-semibold text-[#078337] max-[640px]:justify-center max-[640px]:px-0" href="#/student/dashboard" aria-current="page" aria-label="Dashboard">${icon('grid', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Dashboard</span></a>
			<a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] px-[11px] text-xs text-[#68766c] max-[640px]:justify-center max-[640px]:px-0" href="#/student/discipline" aria-label="Disciplinas">${icon('book', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Disciplinas</span></a>
			<a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] px-[11px] text-xs text-[#68766c] max-[640px]:justify-center max-[640px]:px-0" href="#/student/ranking" aria-label="Ranking">${icon('trophy', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Ranking</span></a>
			<a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] px-[11px] text-xs text-[#68766c] max-[640px]:justify-center max-[640px]:px-0" href="#/student/qa-forum" aria-label="Fórum de dúvidas">${icon('chat', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Fórum de dúvidas</span></a>
		</nav>
		<div class="mt-[21px] grid gap-[5px] rounded-2xl border border-[#e0e8df] p-[15px] max-[640px]:hidden">
			<strong class="text-[11px] font-semibold">Área do aluno</strong><span class="text-[10px] text-[#68766c]">Estude, avance e conquiste XP.</span>
		</div>
		<div class="mt-auto grid gap-[13px] text-[11px] text-[#68766c] max-[640px]:w-full max-[640px]:justify-items-center">
			<div class="flex items-center gap-2.5 border-b border-[#e0e8df] pb-3 max-[640px]:hidden"><span class="size-[7px] rounded-full border border-[#708078]"></span>Tema claro<span class="ml-auto grid size-[27px] place-items-center rounded-lg border-[1.5px] border-[#12a34a]"><span class="size-2 rounded-full bg-[#dcfce7]"></span></span></div>
			<a class="cursor-pointer text-inherit hover:text-green-800 hover:underline max-[640px]:hidden" href="#" aria-disabled="true">Central de ajuda</a>
			<a class="cursor-pointer text-inherit hover:text-green-800 hover:underline max-[640px]:hidden" href="#/login">Sair da conta</a>
			<a class="hidden cursor-pointer text-[#68766c] max-[640px]:block" href="#/login" aria-label="Sair da conta">${icon('logout')}</a>
			<small class="mt-[5px] text-[9px] max-[640px]:hidden">AcademyX © 2026 · Feito para evoluir</small>
		</div>
	</aside>`;
}

function timeChart() {
	const days = [
		['Seg, 05', 'Seg', '2h', 'h-full', 'top-[-14px]'],
		['Ter, 06', 'Ter', '1h 30min', 'h-3/4', 'top-1/4 -translate-y-full'],
		['Qua, 07', 'Qua', '2h', 'h-full', 'top-[-14px]'],
		['Qui, 08', 'Qui', '1h', 'h-1/2', 'top-1/2 -translate-y-full'],
		['Sex, 09', 'Sex', '1h 30min', 'h-3/4', 'top-1/4 -translate-y-full'],
		['Sáb, 10', 'Sáb', '1h', 'h-1/2', 'top-1/2 -translate-y-full'],
		['Dom, 11', 'Dom', '1h', 'h-1/2', 'top-1/2 -translate-y-full'],
	];
	return `<div class="mt-[22px] flex h-[210px]" role="img" aria-label="Tempo de estudo por dia: segunda 2 horas, terça 1 hora e 30 minutos, quarta 2 horas, quinta 1 hora, sexta 1 hora e 30 minutos, sábado 1 hora e domingo 1 hora.">
		<div class="flex w-[35px] shrink-0 flex-col justify-between pb-7 text-[9px] text-[#718077]"><span>2h</span><span>1h</span><span>0</span></div>
		<div class="relative mb-7 min-w-0 flex-1">
			<div class="absolute inset-x-0 top-0 h-px bg-[#e1e9e0]"></div><div class="absolute inset-x-0 top-1/2 h-px bg-[#e1e9e0]"></div><div class="absolute inset-x-0 bottom-0 h-px bg-[#e1e9e0]"></div>
			<div class="absolute inset-0 grid grid-cols-7 gap-4 max-[640px]:gap-1">
				${days.map(([day, shortDay, value, barHeight, labelPosition]) => `<div class="relative flex min-w-0 flex-col items-center justify-end"><span class="absolute left-1/2 ${labelPosition} -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-[#078337]">${value}</span><div class="z-[1] w-[min(40px,68%)] ${barHeight} rounded-t-md bg-[#12a34a]"></div><span class="absolute top-[calc(100%+13px)] whitespace-nowrap text-[9px] text-[#718077] max-[400px]:hidden">${day}</span><span class="absolute top-[calc(100%+13px)] hidden whitespace-nowrap text-[8px] text-[#718077] max-[400px]:block">${shortDay}</span></div>`).join('')}
			</div>
		</div>
	</div>`;
}

function disciplineTable() {
	const headClass = 'h-9 bg-[#f7faf7] px-2.5 text-[8px] font-medium text-[#68766c]';
	const cellClass = 'h-[62px] whitespace-nowrap border-b border-[#e0e8df] px-2.5 text-right text-[10px]';
	return `<div class="mt-[17px] w-full overflow-x-auto">
		<table class="w-full border-collapse text-left">
			<thead><tr><th class="${headClass} pl-3">DISCIPLINA</th><th class="${headClass} text-right">QUESTÕES</th><th class="${headClass} text-right">VIDEOAULAS</th><th class="${headClass} text-right">LEITURA / REVISÃO</th><th class="${headClass} text-right">TOTAL</th></tr></thead>
			<tbody>${detailRows.map(([subject, teacher, questions, videos, reading, total]) => `<tr><td class="h-[62px] whitespace-nowrap border-b border-[#e0e8df] pl-3 pr-2.5"><strong class="block text-[10px] font-semibold">${subject}</strong><small class="mt-1 block text-[9px] text-[#68766c]">${teacher}</small></td><td class="${cellClass}">${questions}</td><td class="${cellClass}">${videos}</td><td class="${cellClass}">${reading}</td><td class="${cellClass} font-semibold text-[#078337]">${total}</td></tr>`).join('')}</tbody>
			<tfoot><tr><th class="h-[42px] bg-[#f0f4ef] pl-3 text-left text-[10px] font-semibold">Total da semana</th><th class="h-[42px] bg-[#f0f4ef] px-2.5 text-right text-[10px] font-semibold">4h 00min</th><th class="h-[42px] bg-[#f0f4ef] px-2.5 text-right text-[10px] font-semibold">3h 30min</th><th class="h-[42px] bg-[#f0f4ef] px-2.5 text-right text-[10px] font-semibold">2h 30min</th><th class="h-[42px] bg-[#f0f4ef] px-2.5 text-right text-[10px] font-semibold text-[#078337]">10h 00min</th></tr></tfoot>
		</table>
	</div>`;
}

function sessionTable() {
	const headClass = 'h-9 bg-[#f7faf7] text-[8px] font-medium text-[#68766c]';
	const cellClass = 'h-12 whitespace-nowrap border-b border-[#e0e8df] text-[10px] text-[#68766c]';
	return `<div class="mt-[17px] w-full overflow-x-auto">
		<table class="w-full min-w-[820px] border-collapse text-left">
			<thead><tr><th class="${headClass} pl-3">DATA · INÍCIO</th><th class="${headClass}">DISCIPLINA</th><th class="${headClass}">AÇÃO REALIZADA</th><th class="${headClass}">CONTEÚDO ESTUDADO</th><th class="${headClass} pr-3 text-right">DURAÇÃO</th></tr></thead>
			<tbody>${sessions.map(([date, subject, actionIcon, action, content, duration]) => `<tr><td class="${cellClass} pl-3">${date}</td><td class="${cellClass}"><strong class="font-semibold text-[#243027]">${subject}</strong></td><td class="${cellClass}"><span class="flex items-center gap-2 text-[#243027]">${icon(actionIcon, 'block size-4 shrink-0 text-[#079840]')}${action}</span></td><td class="${cellClass}">${content}</td><td class="${cellClass} pr-3 text-right"><strong class="font-semibold text-[#243027]">${duration}</strong></td></tr>`).join('')}</tbody>
		</table>
	</div>`;
}

function activityBreakdown() {
	const activities = [
		['checklist', 'Resolução de questões', '4h 00min', 'w-2/5'],
		['playCircle', 'Videoaulas', '3h 30min', 'w-[35%]'],
		['file', 'Leitura / revisão', '2h 30min', 'w-1/4'],
	];
	return `<div class="mt-5 grid gap-[19px]">${activities.map(([symbol, label, duration, width]) => `<div>
		<div class="flex items-center gap-2 text-[10px]">${icon(symbol, 'block size-4 shrink-0 text-[#079840]')}<span>${label}</span><strong class="ml-auto whitespace-nowrap font-semibold">${duration}</strong></div>
		<div class="mt-2 h-[7px] overflow-hidden rounded-lg bg-[#f0f4ef]"><span class="block h-full rounded-lg bg-[#12a34a] ${width} ${symbol === 'playCircle' ? 'bg-[#6fcf91]' : ''} ${symbol === 'file' ? 'bg-[#bce8cb]' : ''}"></span></div>
		<span class="mt-1 block text-right text-[8px] text-[#68766c]">${width === 'w-2/5' ? '40' : width === 'w-[35%]' ? '35' : '25'}%</span>
	</div>`).join('')}</div>`;
}

function questionAccuracyChart() {
	return `<section class="col-span-full min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[760px]:col-auto max-[400px]:p-3" aria-labelledby="ax-accuracy-heading">
		<div class="flex flex-wrap items-start justify-between gap-4">
			<div><h2 id="ax-accuracy-heading" class="m-0 text-lg leading-[1.3] font-normal tracking-[-0.25px]">Precisão das questões por disciplina</h2><p class="mt-1 text-[10px] text-[#68766c]">Percentual de acertos nas questões resolvidas · Semana selecionada</p></div>
			<div class="rounded-[10px] bg-[#dcfce7] px-3 py-2 text-right"><strong class="block text-lg font-bold text-[#078337]">80%</strong><span class="text-[9px] text-[#68766c]">64 de 80 acertos</span></div>
		</div>
		<div class="mt-5 grid gap-4" role="list" aria-label="Precisão em ordem alfabética por disciplina">
			${questionAccuracy.map(({ subject, correct, total, accuracy, barWidth }) => `<div class="grid grid-cols-[minmax(100px,150px)_minmax(0,1fr)_auto] items-center gap-4 max-[400px]:grid-cols-[minmax(0,1fr)_auto] max-[400px]:gap-x-3 max-[400px]:gap-y-2" role="listitem">
				<strong class="text-[11px] font-semibold">${subject}</strong>
				<div class="h-2 overflow-hidden rounded-full bg-[#f0f4ef] max-[400px]:col-span-2 max-[400px]:row-start-2"><div class="h-full ${barWidth} rounded-full bg-[#12a34a]" role="progressbar" aria-label="${subject}: ${accuracy}% de acertos" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${accuracy}"></div></div>
				<span class="whitespace-nowrap text-right text-[10px] text-[#68766c]">${correct}/${total} <strong class="ml-1 text-[#078337]">${accuracy}%</strong></span>
			</div>`).join('')}
		</div>
	</section>`;
}

export default function renderStudentDashboard() {
	return `<div class="h-dvh w-full min-w-0 overflow-hidden bg-[#f7faf7] font-[Inter,ui-sans-serif,system-ui] text-[#19241c]">
		${renderStudentSidebar('dashboard')}
		<div class="ml-[232px] flex h-full min-w-0 flex-col max-[760px]:ml-[190px] max-[640px]:ml-16">
			${renderStudentHeader('Dashboard')}
			<main class="min-w-0 flex-1 overflow-auto px-8 py-[31px] [scrollbar-color:#c4d0c5_transparent] [scrollbar-width:thin] max-[1100px]:px-6 max-[760px]:px-4 max-[760px]:py-[22px] max-[640px]:px-3 max-[640px]:py-4">
				<div class="mb-[22px] flex items-center justify-between gap-5 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-[14px]">
					<div><h1 class="m-0 text-[30px] leading-[1.25] font-bold tracking-[-1.1px] max-[1100px]:text-[26px] max-[760px]:text-[23px]">Seu esforço, seu próximo avanço.</h1><p class="mt-[7px] text-sm text-[#68766c] max-[760px]:text-xs">Olá, Lucas. Acompanhe seu ritmo e descubra como você está aprendendo.</p></div>
					<button class="flex h-[43px] shrink-0 cursor-pointer items-center gap-2 rounded-[11px] border-0 bg-[#12a34a] px-4 text-xs font-semibold text-white" type="button">${icon('play', 'block size-[17px] shrink-0')}Continuar estudando</button>
				</div>

				<div class="relative mb-[22px] flex items-center justify-between gap-4 max-[760px]:flex-col max-[760px]:items-start max-[400px]:w-full">
					<div class="flex min-h-10 w-[370px] max-w-full flex-wrap items-center rounded-[11px] bg-[#f0f4ef] p-1" role="group" aria-label="Filtrar período">
						<button class="h-8 min-w-[50px] flex-1 cursor-pointer rounded-[9px] border-0 bg-transparent text-[11px] text-[#68766c]" type="button" data-period="day" aria-pressed="false">Dia</button><button class="h-8 min-w-[50px] flex-1 cursor-pointer rounded-[9px] border-0 bg-white text-[11px] font-semibold text-[#078337]" type="button" data-period="week" aria-pressed="true">Semana</button><button class="h-8 min-w-[50px] flex-1 cursor-pointer rounded-[9px] border-0 bg-transparent text-[11px] text-[#68766c]" type="button" data-period="month" aria-pressed="false">Mês</button><button class="h-8 min-w-[50px] flex-1 cursor-pointer rounded-[9px] border-0 bg-transparent text-[11px] text-[#68766c]" type="button" data-period="semester" aria-pressed="false">Semestre</button><button class="h-8 min-w-[50px] flex-1 cursor-pointer rounded-[9px] border-0 bg-transparent text-[11px] text-[#68766c]" type="button" data-period="total" aria-pressed="false">Total</button><button class="group relative grid h-8 w-9 shrink-0 cursor-pointer place-items-center rounded-[9px] border-0 bg-transparent text-[#68766c]" type="button" data-period="custom" aria-pressed="false" aria-label="Personalizado"><span class="sr-only">Personalizado</span>${icon('calendar', 'block size-4 shrink-0')}<span class="pointer-events-none absolute left-1/2 top-[-34px] z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#243027] px-2 py-1 text-[10px] font-medium text-white shadow-sm group-hover:block group-focus-visible:block" role="tooltip">Personalizado</span></button>
					</div>
					<div class="flex flex-wrap items-center gap-3.5 text-[10px] text-[#68766c] max-[760px]:w-full max-[760px]:justify-between max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-2"><span id="ax-period-caption">Semana selecionada</span><div class="flex min-h-10 items-center gap-2.5 rounded-[11px] border border-[#e0e8df] bg-white px-2 text-[#68766c] max-[400px]:w-full max-[400px]:justify-between" data-date-controls>
						<button class="grid size-[22px] cursor-pointer place-items-center border-0 bg-transparent p-0" type="button" data-date-step="-1" aria-label="Período anterior">${icon('chevronLeft', 'block size-4 shrink-0')}</button>
						<strong id="ax-date-range" class="min-w-[94px] whitespace-nowrap text-center text-[11px] font-medium text-[#243027]">05–11 out. 2026</strong>
						<button class="grid size-[22px] cursor-pointer place-items-center border-0 bg-transparent p-0" type="button" data-date-step="1" aria-label="Próximo período">${icon('chevronRight', 'block size-4 shrink-0')}</button>
						<div class="hidden items-center gap-2" data-custom-range>
							<label class="flex items-center gap-1 whitespace-nowrap text-[9px]">De <input class="w-[112px] rounded-md border border-[#e0e8df] bg-white px-1.5 py-1 text-[10px] text-[#243027] outline-none focus:border-[#12a34a] max-[400px]:w-[94px]" type="date" data-range-start aria-label="Data inicial"></label>
							<label class="flex items-center gap-1 whitespace-nowrap text-[9px]">Até <input class="w-[112px] rounded-md border border-[#e0e8df] bg-white px-1.5 py-1 text-[10px] text-[#243027] outline-none focus:border-[#12a34a] max-[400px]:w-[94px]" type="date" data-range-end aria-label="Data final"></label>
							<button class="cursor-pointer rounded-md border-0 bg-transparent px-1.5 py-1 text-[10px] font-medium text-[#078337] hover:bg-[#f0f4ef] focus-visible:outline-2 focus-visible:outline-[#12a34a]" type="button" data-clear-range>Limpar</button>
						</div>
					</div></div>
					<span class="absolute right-0 top-[calc(100%+4px)] z-30 hidden max-w-full rounded-lg border border-[#fecaca] bg-white px-3 py-2 text-right text-[10px] leading-4 text-[#b42318] shadow-lg" data-range-error role="alert"></span>
				</div>

				<section class="mb-[22px] grid grid-cols-3 gap-5 max-[1100px]:gap-3 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1" aria-label="Resumo acadêmico">
					<article class="relative h-[143px] min-w-0 rounded-2xl border border-[#e0e8df] bg-white px-[21px] py-[25px] max-[1100px]:px-[14px] max-[760px]:h-[130px] max-[760px]:p-5"><div class="text-[9px] font-semibold text-[#66746a]">MEU CADASTRO</div>${icon('book', 'absolute right-5 top-[22px] block size-5 shrink-0 text-[#12a34a]')}<div class="mt-[13px] flex items-baseline gap-3 whitespace-nowrap text-[32px] leading-[1.15] font-bold tracking-[-1px] max-[1100px]:gap-2 max-[1100px]:text-[27px]">3 <span class="text-xs font-normal tracking-normal">disciplinas vinculadas</span></div><p class="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#68766c]">Matemática, Português e Biologia</p></article>
					<article class="relative h-[143px] min-w-0 rounded-2xl border border-[#e0e8df] bg-white px-[21px] py-[25px] max-[1100px]:px-[14px] max-[760px]:h-[130px] max-[760px]:p-5"><div class="text-[9px] font-semibold text-[#66746a]">NA SEMANA SELECIONADA</div>${icon('checklist', 'absolute right-5 top-[22px] block size-5 shrink-0 text-[#12a34a]')}<div class="mt-[13px] flex items-baseline gap-3 whitespace-nowrap text-[32px] leading-[1.15] font-bold tracking-[-1px] max-[1100px]:gap-2 max-[1100px]:text-[27px]">80 <span class="text-xs font-normal tracking-normal">questões resolvidas</span></div><p class="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#68766c]">40 em Matemática · 20 em Português · 20 em Biologia</p></article>
					<article class="relative h-[143px] min-w-0 rounded-2xl border border-[#dcfce7] bg-[#dcfce7] px-[21px] py-[25px] max-[1100px]:px-[14px] max-[900px]:col-span-2 max-[640px]:col-auto max-[760px]:h-[130px] max-[760px]:p-5 max-[400px]:px-4"><div class="text-[9px] font-semibold text-[#66746a]">NA SEMANA SELECIONADA</div>${icon('timer', 'absolute right-5 top-[22px] block size-5 shrink-0 text-[#12a34a]')}<div class="mt-[13px] flex items-baseline gap-3 whitespace-nowrap text-[32px] leading-[1.15] font-bold tracking-[-1px] max-[1100px]:gap-2 max-[1100px]:text-[27px] max-[400px]:gap-1 max-[400px]:text-[24px]">10h 00min <span class="text-xs font-normal tracking-normal">de estudo</span></div><p class="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#68766c]">9 sessões concluídas · 7 dias com estudo</p></article>
				</section>

				<div class="grid grid-cols-[minmax(0,1.96fr)_minmax(300px,1fr)] items-start gap-x-5 gap-y-[22px] max-[1100px]:grid-cols-[minmax(0,1.8fr)_minmax(285px,1fr)] max-[1100px]:gap-4 max-[900px]:grid-cols-1 max-[640px]:gap-3">
					<section class="min-h-[331px] min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[400px]:p-3">
						<div class="flex items-center justify-between gap-3"><div><h2 class="m-0 text-lg leading-[1.3] font-normal tracking-[-0.25px]">Seu tempo de estudo</h2><p class="mt-1 text-[10px] text-[#68766c]">Tempo por dia · 05–11 out. 2026</p></div><strong class="whitespace-nowrap text-[11px] font-semibold text-[#078337]">10h na semana</strong></div>
						${timeChart()}
						<p class="mt-5 text-[10px] text-[#68766c]">Um passo por dia: você estudou nos 7 dias desta semana.</p>
					</section>
					<section class="min-h-[319px] min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[400px]:p-3">
						<div><h2 class="m-0 text-lg leading-[1.3] font-normal tracking-[-0.25px]">Tempo por disciplina</h2><p class="mt-1 text-[10px] text-[#68766c]">Suas 3 disciplinas · Semana selecionada</p></div>
						<div class="my-6 flex items-center gap-[17px] max-[400px]:flex-col max-[400px]:items-start">
							<div class="relative grid size-[122px] shrink-0 place-items-center rounded-full bg-[conic-gradient(#12a34a_0_45%,#6fcf91_45%_75%,#bce8cb_75%_100%)]" role="img" aria-label="Matemática 45%, Português 30%, Biologia 25%"><div class="z-[1] flex size-[86px] flex-col items-center justify-center rounded-full bg-white"><strong class="text-[23px] font-bold">10h</strong><span class="mt-0.5 text-[9px] text-[#68766c]">de estudo</span></div></div>
							<ul class="m-0 grid list-none gap-[13px] p-0">
								<li class="flex items-start gap-2 whitespace-nowrap text-[11px]"><span class="mt-1 size-[7px] shrink-0 rounded-full bg-[#12a34a]"></span><div class="leading-[1.3]">Matemática<small class="mt-1 block text-[9px] text-[#68766c]">4h 30min · 45%</small></div></li>
								<li class="flex items-start gap-2 whitespace-nowrap text-[11px]"><span class="mt-1 size-[7px] shrink-0 rounded-full bg-[#6fcf91]"></span><div class="leading-[1.3]">Português<small class="mt-1 block text-[9px] text-[#68766c]">3h 00min · 30%</small></div></li>
								<li class="flex items-start gap-2 whitespace-nowrap text-[11px]"><span class="mt-1 size-[7px] shrink-0 rounded-full bg-[#bce8cb]"></span><div class="leading-[1.3]">Biologia<small class="mt-1 block text-[9px] text-[#68766c]">2h 30min · 25%</small></div></li>
							</ul>
						</div>
						<div class="rounded-[10px] bg-[#f0f4ef] p-3 text-[10px] leading-[1.5] text-[#68766c]">Matemática foi seu maior foco: 45% do tempo de estudo nesta semana.</div>
					</section>

					<section class="min-h-[300px] min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[400px]:p-3"><div><h2 class="m-0 text-lg leading-[1.3] font-normal tracking-[-0.25px]">Cada disciplina, em detalhe</h2><p class="mt-1 text-[10px] text-[#68766c]">Como você dividiu seu tempo · 05–11 out. 2026</p></div>${disciplineTable()}</section>
					<section class="min-h-[300px] min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[400px]:p-3"><div><h2 class="m-0 text-lg leading-[1.3] font-normal tracking-[-0.25px]">Como você estudou</h2><p class="mt-1 text-[10px] text-[#68766c]">Distribuição por atividade · 10h no total</p></div>${activityBreakdown()}<p class="mt-[21px] text-[9px] leading-[1.5] text-[#68766c]">Somente tempo efetivo das sessões concluídas, sem contar pausas.</p></section>

					${questionAccuracyChart()}

					<section class="col-span-full min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[760px]:col-auto max-[400px]:p-3">
						<div class="flex items-center justify-between gap-3"><div><h2 class="m-0 text-lg leading-[1.3] font-normal tracking-[-0.25px]">Seu histórico de sessões</h2><p class="mt-1 text-[10px] text-[#68766c]">Todas as sessões de 05–11 out. 2026 · Mais recentes primeiro</p></div><span class="whitespace-nowrap rounded-lg bg-[#dcfce7] px-2.5 py-1.5 text-[9px] font-semibold text-[#078337]">9 concluídas</span></div>
						${sessionTable()}<div class="mt-3.5 flex justify-between gap-3 text-[9px] text-[#68766c]"><span>Exibindo 9 de 9 sessões no período</span><strong class="text-[10px] text-[#078337]">Total: 10h 00min</strong></div>
					</section>
				</div>
				<footer class="mt-[18px] text-[10px] text-[#68766c]">Somente disciplinas vinculadas ao seu cadastro · Dados fictícios · Atualizado em 12 out. 2026, às 08:00</footer>
			</main>
		</div>
	</div>`;
}

export function bindStudentDashboard(root) {
	bindStudentShell(root);
	const periodButtons = [...root.querySelectorAll('[data-period]')];
	const caption = root.querySelector('#ax-period-caption');
	const range = root.querySelector('#ax-date-range');
	const dateControls = root.querySelector('[data-date-controls]');
	const customRange = root.querySelector('[data-custom-range]');
	const rangeStart = root.querySelector('[data-range-start]');
	const rangeEnd = root.querySelector('[data-range-end]');
	const rangeError = root.querySelector('[data-range-error]');
	const clearRangeButton = root.querySelector('[data-clear-range]');
	const dateStepButtons = [...root.querySelectorAll('[data-date-step]')];
	let period = 'week';
	let anchorDate = new Date(2026, 9, 5);
	let customStart = '2026-10-05';
	let customEnd = '';

	if (rangeStart) rangeStart.value = customStart;
	if (rangeEnd) rangeEnd.value = '';

	const formatCustomRange = (startValue, endValue) => {
		const formatDate = (value) => {
			const [year, month, day] = value.split('-').map(Number);
			return new Date(year, month - 1, day).toLocaleDateString('pt-BR');
		};
		return `${formatDate(startValue)}–${formatDate(endValue)}`;
	};

	const customRangeDays = (startValue, endValue) => {
		const toUtcDay = (value) => {
			const [year, month, day] = value.split('-').map(Number);
			return Date.UTC(year, month - 1, day);
		};
		return (toUtcDay(endValue) - toUtcDay(startValue)) / 86400000 + 1;
	};

	const shiftDate = (value, days) => {
		const [year, month, day] = value.split('-').map(Number);
		const date = new Date(Date.UTC(year, month - 1, day + days));
		return date.toISOString().slice(0, 10);
	};

	const formatRange = () => {
		if (period === 'day') {
			return anchorDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
		}
		if (period === 'month') {
			return anchorDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
		}
		if (period === 'semester') {
			const firstMonth = anchorDate.getMonth() < 6 ? 0 : 6;
			const start = new Date(anchorDate.getFullYear(), firstMonth, 1);
			const end = new Date(anchorDate.getFullYear(), firstMonth + 6, 0);
			const formatMonth = (date) => date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
			return `${String(start.getDate()).padStart(2, '0')} ${formatMonth(start)} – ${String(end.getDate()).padStart(2, '0')} ${formatMonth(end)}. ${end.getFullYear()}`;
		}
		const start = new Date(anchorDate);
		start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
		const end = new Date(start);
		end.setDate(end.getDate() + 6);
		const startDay = String(start.getDate()).padStart(2, '0');
		const endDay = String(end.getDate()).padStart(2, '0');
		const month = end.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
		return `${startDay}–${endDay} ${month}. ${end.getFullYear()}`;
	};

	const updateDate = () => {
		const isCustom = period === 'custom';
		const isTotal = period === 'total';
		dateControls?.classList.toggle('hidden', isTotal);
		if (range) {
			range.classList.toggle('hidden', isCustom);
			if (isCustom) {
				if (customStart && customEnd && customStart <= customEnd && customRangeDays(customStart, customEnd) <= 30) {
					range.textContent = formatCustomRange(customStart, customEnd);
				}
			} else if (!isTotal) {
				range.textContent = formatRange();
			}
		}
		customRange?.classList.toggle('hidden', !isCustom);
		customRange?.classList.toggle('flex', isCustom);
		dateStepButtons.forEach((button) => button.classList.toggle('hidden', isCustom || isTotal));
		if (caption) caption.textContent = {
			day: 'Dia selecionado',
			week: 'Semana selecionada',
			month: 'Mês selecionado',
			semester: 'Semestre selecionado',
			total: 'Todo o período',
			custom: 'Período personalizado',
		}[period];
	};

	periodButtons.forEach((button) => button.addEventListener('click', () => {
		period = button.dataset.period;
		periodButtons.forEach((item) => {
			const selected = item === button;
			item.classList.toggle('bg-white', selected);
			item.classList.toggle('text-[#078337]', selected);
			item.classList.toggle('font-semibold', selected);
			item.classList.toggle('text-[#68766c]', !selected);
			item.setAttribute('aria-pressed', String(selected));
		});
		updateDate();
		if (period === 'custom') {
			updateCustomRange();
		} else if (rangeError) {
			rangeError.textContent = '';
			rangeError.classList.add('hidden');
		}
	}));

	const updateCustomRange = () => {
		if (!rangeStart || !rangeEnd) return;
		customStart = rangeStart.value;
		customEnd = rangeEnd.value;
		const updateDateConstraints = () => {
			if (customStart) {
				rangeEnd.min = customStart;
				rangeEnd.max = shiftDate(customStart, 29);
			} else {
				rangeEnd.removeAttribute('min');
				rangeEnd.removeAttribute('max');
			}
			if (customEnd) {
				rangeStart.min = shiftDate(customEnd, -29);
				rangeStart.max = customEnd;
			} else {
				rangeStart.removeAttribute('min');
				rangeStart.removeAttribute('max');
			}
		};
		updateDateConstraints();
		if (!customStart || !customEnd) {
			rangeError.textContent = 'Selecione uma data inicial e uma data final.';
			rangeError.classList.remove('hidden');
			if (range) range.textContent = '';
			return;
		}
		if (customStart > customEnd) {
			if (document.activeElement === rangeStart) {
				customEnd = customStart;
				rangeEnd.value = customEnd;
			} else {
				customStart = customEnd;
				rangeStart.value = customStart;
			}
			rangeError.textContent = 'As datas foram ajustadas para manter a data inicial antes da final.';
			rangeError.classList.remove('hidden');
		} else if (customRangeDays(customStart, customEnd) > 30) {
			if (document.activeElement === rangeStart) {
				customEnd = shiftDate(customStart, 29);
				rangeEnd.value = customEnd;
			} else {
				customStart = shiftDate(customEnd, -29);
				rangeStart.value = customStart;
			}
			rangeError.textContent = 'O período foi ajustado ao limite máximo de 30 dias.';
			rangeError.classList.remove('hidden');
		} else {
			rangeError.textContent = '';
			rangeError.classList.add('hidden');
		}
		updateDateConstraints();
		if (customStart && customEnd && customStart <= customEnd && customRangeDays(customStart, customEnd) <= 30) {
			if (range) range.textContent = formatCustomRange(customStart, customEnd);
		}
	};

	rangeStart?.addEventListener('change', updateCustomRange);
	rangeEnd?.addEventListener('change', updateCustomRange);
	clearRangeButton?.addEventListener('click', () => {
		customStart = '';
		customEnd = '';
		rangeStart.value = '';
		rangeEnd.value = '';
		rangeStart.removeAttribute('min');
		rangeStart.removeAttribute('max');
		rangeEnd.removeAttribute('min');
		rangeEnd.removeAttribute('max');
		rangeError.textContent = '';
		rangeError.classList.add('hidden');
		if (range) range.textContent = '';
		rangeStart.focus();
	});

	root.querySelectorAll('[data-date-step]').forEach((button) => button.addEventListener('click', () => {
		const direction = Number(button.dataset.dateStep);
		if (period === 'day') anchorDate.setDate(anchorDate.getDate() + direction);
		else if (period === 'month' || period === 'semester') {
			const day = anchorDate.getDate();
			anchorDate.setDate(1);
			anchorDate.setMonth(anchorDate.getMonth() + direction * (period === 'semester' ? 6 : 1));
			anchorDate.setDate(Math.min(day, new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0).getDate()));
		}
		else anchorDate.setDate(anchorDate.getDate() + direction * 7);
		updateDate();
	}));

	root.querySelectorAll('[aria-disabled="true"]').forEach((link) => {
		link.addEventListener('click', (event) => event.preventDefault());
	});
}
