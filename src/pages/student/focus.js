import { renderStudentHeader, renderStudentSidebar, bindStudentShell } from '../../components/header.js';

const iconPaths = {
	plus: '<path d="M12 5v14m-7-7h14"/>',
	play: '<path d="m7 4 13 8-13 8V4Z"/>',
	pause: '<path d="M8 5h3v14H8zm5 0h3v14h-3z"/>',
	check: '<path d="m5 12 4 4L19 6"/>',
	clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
	calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
	calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
	language: '<path d="m5 8 6 6m-7 0 6-6 2-3M2 5h12M7 2h.01M14 21l5-12 5 12m-2-5h-6"/>',
	leaf: '<path d="M20 4c-8 0-13 3-13 9a5 5 0 0 0 5 5c6 0 9-6 8-14ZM4 21c2-5 6-8 11-11"/>',
	book: '<path d="M12 7v14m0-14C10.5 5.5 8.5 5 3 5v14c5.5 0 7.5.5 9 2m0-14c1.5-1.5 3.5-2 9-2v14c-5.5 0-7.5.5-9 2"/>',
	edit: '<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
	trash: '<path d="M3 6h18m-2 0-1 14H6L5 6m3 0V4h8v2m-5 4v6m4-6v6"/>',
	close: '<path d="m18 6-12 12M6 6l12 12"/>',
	info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
	chevron: '<path d="m7 10 5 5 5-5"/>',
};
const icon = (name, className = 'size-4 shrink-0') => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
const pauseIcon = (className) => `<svg class="${className}" width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.11748 0.700195H7.74267C8.04185 0.700195 8.2844 0.942708 8.2844 1.24186V9.90853C8.2844 10.2077 8.04185 10.4502 7.74267 10.4502H6.11748C5.81829 10.4502 5.57575 10.2077 5.57575 9.90853V1.24186C5.57575 0.942708 5.81829 0.700195 6.11748 0.700195ZM1.24192 0.700195H2.86711C3.1663 0.700195 3.40884 0.942708 3.40884 1.24186V9.90853C3.40884 10.2077 3.1663 10.4502 2.86711 10.4502H1.24192C0.942735 10.4502 0.700195 10.2077 0.700195 9.90853V1.24186C0.700195 0.942708 0.942735 0.700195 1.24192 0.700195Z" stroke-width="1.4" stroke-linecap="round" stroke="#FBBF24"/></svg>`;
const subjects = [
	{ name: 'Matemática', teacher: 'Helena Lima', icon: 'calculator' },
	{ name: 'Português', teacher: 'Camila Rocha', icon: 'language' },
	{ name: 'Biologia', teacher: 'Bruno Mendes', icon: 'leaf' },
];
const activities = ['Resolução de questões', 'Videoaulas', 'Leitura / revisão'];
const activityShort = { 'Resolução de questões': 'Questões', Videoaulas: 'Videoaulas', 'Leitura / revisão': 'Leitura / revisão' };
const seedSessions = [
	{ id: 's1', date: '2026-10-11', time: '10:00', subject: 'Biologia', activity: activities[0], minutes: 60, source: 'Cronometrada', content: '20 questões · Genética mendeliana' },
	{ id: 's2', date: '2026-10-10', time: '09:30', subject: 'Biologia', activity: activities[1], minutes: 60, source: 'Cronometrada', content: 'Herança e leis de Mendel' },
	{ id: 's3', date: '2026-10-09', time: '16:30', subject: 'Biologia', activity: activities[2], minutes: 30, source: 'Manual', content: 'Resumo de genética' },
	{ id: 's4', date: '2026-10-09', time: '14:00', subject: 'Português', activity: activities[2], minutes: 60, source: 'Manual', content: 'Estratégias de interpretação' },
	{ id: 's5', date: '2026-10-08', time: '15:00', subject: 'Português', activity: activities[1], minutes: 60, source: 'Cronometrada', content: 'Interpretação de texto' },
	{ id: 's6', date: '2026-10-07', time: '16:00', subject: 'Português', activity: activities[0], minutes: 60, source: 'Cronometrada', content: '20 questões · Interpretação de texto' },
	{ id: 's7', date: '2026-10-07', time: '10:00', subject: 'Matemática', activity: activities[2], minutes: 60, source: 'Manual', content: 'Raízes, vértice e gráfico' },
	{ id: 's8', date: '2026-10-06', time: '14:00', subject: 'Matemática', activity: activities[1], minutes: 90, source: 'Cronometrada', content: 'Funções do 2º grau' },
	{ id: 's9', date: '2026-10-05', time: '09:00', subject: 'Matemática', activity: activities[0], minutes: 120, source: 'Cronometrada', content: '40 questões · Funções do 2º grau' },
];

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const prettyDate = (iso, options = { day: '2-digit', month: 'short', year: 'numeric' }) => new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', options).replace('.', '');
const formatMinutes = (minutes) => `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}min`;
const formatDuration = (minutes) => minutes >= 60 ? formatMinutes(minutes) : `${minutes}min`;
const getInitialState = () => {
	try {
		const saved = JSON.parse(localStorage.getItem('academyx-focus-sessions') || 'null');
		if (Array.isArray(saved)) return saved;
	} catch {}
	return seedSessions.map((session) => ({ ...session }));
};

let sessions = getInitialState();
let selectedSubject = 'Matemática';
let selectedActivity = activities[0];
let elapsedSeconds = 42 * 60 + 18;
let timerStatus = 'paused';
let timerStartedAt = null;
let timerHandle = null;
let editId = sessions[0]?.id ?? null;
let deleteId = null;
let page = 1;
let filterSubject = 'all';
let addMode = 'duration';

function saveSessions() {
	try { localStorage.setItem('academyx-focus-sessions', JSON.stringify(sessions)); } catch {}
}

function getElapsedSeconds() {
	return timerStatus === 'running' && timerStartedAt ? elapsedSeconds + Math.floor((Date.now() - timerStartedAt) / 1000) : elapsedSeconds;
}

function timerText(totalSeconds) {
	const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
	const seconds = String(totalSeconds % 60).padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}

function subjectCards() {
	return subjects.map(({ name, teacher, icon: symbol }) => {
		const selected = selectedSubject === name;
		return `<button class="flex min-h-[82px] cursor-pointer flex-col justify-between rounded-[11px] border ${selected ? 'border-[#12a34a] bg-[#dcfce7] text-[#078337]' : 'border-[#e0e8df] bg-[#f8faf7] text-[#243027]'} p-3 text-left" type="button" data-subject="${name}" aria-pressed="${selected}"><span class="flex w-full items-center justify-between">${icon(symbol, 'size-[18px] text-current')}<span class="grid size-3 place-items-center rounded-full border ${selected ? 'border-[#12a34a] bg-[#12a34a]' : 'border-[#d5dfd5] bg-white'}">${selected ? '<span class="size-1.5 rounded-full bg-white"></span>' : ''}</span></span><span class="mt-2 text-[12px] font-semibold">${name}</span><small class="text-[10px] opacity-70">${teacher}</small></button>`;
	}).join('');
}

function activityCards() {
	return activities.map((activity) => {
		const selected = selectedActivity === activity;
		return `<button class="flex min-h-10 cursor-pointer items-center gap-2 rounded-[10px] border ${selected ? 'border-[#12a34a] bg-[#dcfce7] text-[#078337]' : 'border-[#e0e8df] bg-[#f8faf7] text-[#536259]'} px-2.5 text-left text-[10px]" type="button" data-activity="${activity}" aria-pressed="${selected}"><span class="grid size-2.5 shrink-0 place-items-center rounded-full ${selected ? 'bg-[#12a34a]' : 'border border-[#d5dfd5] bg-white'}"></span>${activity}</button>`;
	}).join('');
}

function durationFields(idPrefix, hours = 0, minutes = 45) {
	return `<div class="grid grid-cols-2 gap-3"><label class="grid gap-1.5 text-[10px] text-[#536259]">Horas<input class="h-10 min-w-0 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs text-[#19241c] outline-none focus:border-[#12a34a]" type="number" min="0" max="99" value="${hours}" data-${idPrefix}-hours></label><label class="grid gap-1.5 text-[10px] text-[#536259]">Minutos<input class="h-10 min-w-0 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs text-[#19241c] outline-none focus:border-[#12a34a]" type="number" min="0" max="59" value="${minutes}" data-${idPrefix}-minutes></label></div>`;
}

function manualPanel() {
	return `<section class="min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[400px]:p-4" aria-labelledby="ax-manual-heading">
		<div><h2 id="ax-manual-heading" class="m-0 text-lg font-semibold tracking-[-.3px]">Adicionar sessão manual</h2><p class="mt-1 text-[11px] text-[#68766c]">Estudou sem cronômetro? Registre aqui.</p></div>
		<form class="mt-5 grid gap-4" data-manual-form>
			<label class="grid gap-1.5 text-[11px] text-[#536259]">Disciplina *<select class="h-10 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs text-[#243027] outline-none focus:border-[#12a34a]" name="subject" required>${subjects.map(({ name }) => `<option>${name}</option>`).join('')}</select></label>
			<p class="-mt-2 text-[9px] text-[#68766c]">Matemática, Português ou Biologia · seu cadastro</p>
			<label class="grid gap-1.5 text-[11px] text-[#536259]">Tipo de atividade *<select class="h-10 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs text-[#243027] outline-none focus:border-[#12a34a]" name="activity" required>${activities.map((activity) => `<option>${activity}</option>`).join('')}</select></label>
			<label class="grid gap-1.5 text-[11px] text-[#536259]">Data do estudo *<input class="h-10 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs text-[#243027] outline-none focus:border-[#12a34a]" type="date" name="date" value="2026-10-12" required></label>
			<fieldset class="grid gap-2 border-0 p-0"><legend class="mb-2 text-[11px] text-[#536259]">Como deseja informar o tempo?</legend><div class="grid grid-cols-2 rounded-[10px] bg-[#f0f4ef] p-1"><button class="h-8 cursor-pointer rounded-lg border-0 ${addMode === 'duration' ? 'bg-white font-semibold text-[#078337]' : 'bg-transparent text-[#68766c]'} text-[10px]" type="button" data-add-mode="duration" aria-pressed="${addMode === 'duration'}">Duração</button><button class="h-8 cursor-pointer rounded-lg border-0 ${addMode === 'range' ? 'bg-white font-semibold text-[#078337]' : 'bg-transparent text-[#68766c]'} text-[10px]" type="button" data-add-mode="range" aria-pressed="${addMode === 'range'}">Início e fim</button></div>
				${addMode === 'duration' ? `<div><label class="mb-1.5 block text-[10px] text-[#536259]">Duração da sessão</label>${durationFields('manual', 0, 45)}</div>` : '<div class="grid grid-cols-2 gap-3"><label class="grid gap-1.5 text-[10px] text-[#536259]">Início<input class="h-10 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs" type="time" name="start" value="09:00"></label><label class="grid gap-1.5 text-[10px] text-[#536259]">Fim<input class="h-10 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs" type="time" name="end" value="09:45"></label></div>'}
			</fieldset>
			<div class="flex gap-2 rounded-[11px] bg-[#f7faf7] p-3 text-[10px] leading-[1.5] text-[#68766c]">${icon('info', 'mt-px size-4 shrink-0')}<span>Informe apenas o tempo efetivo, sem pausas. O registro será adicionado ao histórico.</span></div>
			<div class="flex flex-wrap gap-2"><button class="flex h-10 cursor-pointer items-center gap-2 rounded-[10px] border-0 bg-[#12a34a] px-4 text-[11px] font-semibold text-white hover:bg-[#078337]" type="submit">${icon('plus')}Salvar sessão manual</button><button class="h-10 cursor-pointer rounded-[10px] border border-[#e0e8df] bg-white px-3 text-[11px] font-medium text-[#078337]" type="reset" data-clear-manual>Limpar</button></div>
			<p class="text-[9px] text-[#68766c]" data-manual-message aria-live="polite">Rascunho · ainda não adicionado ao histórico</p>
		</form>
	</section>`;
}

function focusSessionPanel() {
	const status = timerStatus === 'running' ? 'Sessão em andamento' : timerStatus === 'paused' ? 'Sessão pausada' : 'Pronto para estudar';
	const elapsed = getElapsedSeconds();
	return `<section class="min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[400px]:p-4" aria-labelledby="ax-focus-heading">
		<div class="flex items-center justify-between gap-3"><h2 id="ax-focus-heading" class="m-0 flex items-center gap-2.5 text-lg font-semibold tracking-[-.3px]">${icon('check', 'size-[19px] text-[#12a34a]')}Sua sessão de foco</h2><span class="rounded-lg bg-[#fff7e6] px-2.5 py-1.5 text-[9px] font-medium text-[#9a6700]">${status}</span></div>
		<div class="mt-4 flex items-center justify-between gap-3"><label class="text-[11px] font-medium">Disciplina *</label><span class="text-[9px] text-[#68766c]">Suas 3 disciplinas</span></div>
		<div class="mt-2 grid grid-cols-3 gap-2.5 max-[400px]:grid-cols-1">${subjectCards()}</div>
		<div class="mt-4 text-[11px] font-medium">Tipo de atividade *</div><div class="mt-2 grid grid-cols-3 gap-2.5 max-[500px]:grid-cols-1">${activityCards()}</div>
		<div class="mt-4 grid min-h-[154px] place-items-center rounded-[13px] bg-[#f7faf7] px-3 py-4 text-center"><div><div class="text-[9px] font-semibold text-[#68766c]">TEMPO EFETIVO DE ESTUDO</div><div class="mt-1 text-[58px] leading-none font-bold tracking-[-2px] tabular-nums max-[500px]:text-[46px]" data-timer>${timerText(elapsed)}</div><p class="mt-2 flex items-center justify-center gap-2 text-[10px] text-[#68766c]">${timerStatus === 'running' ? icon('clock', 'size-3.5') : timerStatus === 'paused' ? pauseIcon('h-3 w-[9px] shrink-0') : icon('play', 'size-3.5')}<span data-timer-subtitle>${timerStatus === 'running' ? 'Cronômetro ativo · pausas não contam como estudo' : timerStatus === 'paused' ? 'Pausas não contam como tempo de estudo' : 'Inicie uma sessão quando estiver pronto'}</span></p><p class="mt-1 text-[9px] text-[#68766c]">Disciplina: ${selectedSubject} · ${selectedActivity}</p></div></div>
		<div class="mt-4 flex flex-wrap justify-center gap-2.5">
			${timerStatus === 'running' ? `<button class="h-10 cursor-pointer rounded-[10px] border border-[#e0e8df] bg-[#f0f4ef] px-4 text-[11px] font-semibold text-[#536259]" type="button" data-timer-action="pause">${pauseIcon('mr-1 inline h-3 w-[9px] align-middle')}Pausar sessão</button>` : timerStatus === 'paused' ? `<button class="h-10 cursor-pointer rounded-[10px] border-0 bg-[#12a34a] px-4 text-[11px] font-semibold text-white" type="button" data-timer-action="resume">${icon('play', 'mr-1 inline size-4 align-middle')}Retomar sessão</button>` : `<button class="h-10 cursor-pointer rounded-[10px] border-0 bg-[#12a34a] px-4 text-[11px] font-semibold text-white" type="button" data-timer-action="start">${icon('play', 'mr-1 inline size-4 align-middle')}Iniciar sessão</button>`}
			${timerStatus !== 'finished' ? `<button class="h-10 cursor-pointer rounded-[10px] border border-[#e0e8df] bg-white px-4 text-[11px] font-medium text-[#078337]" type="button" data-timer-action="finish">${icon('check', 'mr-1 inline size-4 align-middle')}Concluir e salvar</button>` : ''}
		</div>
		<p class="mt-3 text-center text-[10px] text-[#68766c]">Ao pausar, o tempo deixa de contar. Conclua para registrar no histórico.</p>
		<div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e0e8df] pt-4"><p class="text-[10px] leading-5"><strong>* Disciplina e atividade são obrigatórias.</strong><span class="block text-[#68766c]">Sessões pausadas e alterações não salvas não entram nos totais.</span></p><button class="h-10 cursor-pointer rounded-[10px] border border-[#e0e8df] bg-[#f0f4ef] px-3 text-[10px] font-medium text-[#536259]" type="button" data-timer-action="new" ${timerStatus !== 'finished' ? 'disabled' : ''}>${icon('play', 'mr-1 inline size-4 align-middle')}Iniciar nova sessão</button></div>
	</section>`;
}

function weekSummary() {
	const weekSessions = sessions.filter((session) => session.date >= '2026-10-05' && session.date <= '2026-10-11');
	const total = weekSessions.reduce((sum, session) => sum + Number(session.minutes || 0), 0);
	const grouped = subjects.map(({ name }) => `${name} ${formatDuration(weekSessions.filter((session) => session.subject === name).reduce((sum, session) => sum + Number(session.minutes || 0), 0))}`).join(' · ');
	return `<section class="grid grid-cols-[1fr_.65fr_2.1fr] items-center gap-4 rounded-[16px] bg-[#dcfce7] px-[18px] py-4 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1" aria-label="Resumo semanal"><div><div class="text-[9px] font-semibold text-[#078337]">SEMANA CONCLUÍDA · 05–11 OUT. 2026</div><strong class="mt-1 block text-[25px] leading-tight font-bold tracking-[-.7px]">${formatMinutes(total)}</strong><span class="text-[10px]">de estudo</span></div><div><strong class="block text-[19px] font-semibold">${weekSessions.length} sessões</strong><span class="text-[10px] text-[#68766c]">Somente concluídas</span></div><div class="text-[11px] leading-6"><strong class="font-medium">${grouped}</strong><span class="block text-[9px] text-[#68766c]">Pausas, sessão atual e alterações não salvas não entram nos totais.</span></div></section>`;
}

function sessionDateLabel(session) {
	return `${prettyDate(session.date, { day: '2-digit', month: 'short' })} · ${session.time}`;
}

function historyPanel() {
	const filtered = sessions.filter((session) => filterSubject === 'all' || session.subject === filterSubject);
	const pageSize = 5;
	const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
	page = Math.min(page, pageCount);
	const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
	const selected = sessions.find((session) => session.id === editId);
	return `<section class="min-w-0 rounded-[17px] border border-[#e0e8df] bg-white p-[21px] max-[400px]:p-4" aria-labelledby="ax-history-heading">
		<div class="flex items-start justify-between gap-3"><div><h2 id="ax-history-heading" class="m-0 text-lg font-semibold tracking-[-.3px]">Seu histórico de sessões</h2><p class="mt-1 text-[10px] text-[#68766c]">Edite ou exclua sessões cronometradas e manuais.</p></div><span class="whitespace-nowrap rounded-lg bg-[#dcfce7] px-2.5 py-1.5 text-[9px] font-semibold text-[#078337]">${filtered.length} concluídas</span></div>
		<div class="mt-4 flex flex-wrap items-center gap-2"><label class="flex h-9 items-center gap-2 rounded-lg border border-[#e0e8df] px-2.5 text-[10px] text-[#536259]">${icon('calendar', 'size-3.5')}Todas as datas</label><label class="relative"><span class="sr-only">Filtrar disciplina</span><select class="h-9 cursor-pointer appearance-none rounded-lg border border-[#e0e8df] bg-white pl-3 pr-8 text-[10px] text-[#243027]" data-history-filter><option value="all" ${filterSubject === 'all' ? 'selected' : ''}>Todas as disciplinas</option>${subjects.map(({ name }) => `<option value="${name}" ${filterSubject === name ? 'selected' : ''}>${name}</option>`).join('')}</select>${icon('chevron', 'pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 rotate-0')}</label><span class="ml-auto text-[9px] text-[#68766c]">Mais recentes</span></div>
		<div class="mt-4 w-full overflow-x-auto"><table class="w-full min-w-[590px] border-collapse text-left"><thead><tr class="h-9 bg-[#f7faf7] text-[8px] font-medium text-[#68766c]"><th class="pl-2.5">DATA · INÍCIO</th><th>DISCIPLINA</th><th>ATIVIDADE</th><th class="text-right">DURAÇÃO</th><th class="pr-2.5 text-right">AÇÕES</th></tr></thead><tbody>${visible.length ? visible.map((session) => `<tr class="h-[63px] border-b border-[#e0e8df] ${editId === session.id ? 'bg-[#dcfce7]' : ''}"><td class="px-2.5 text-[10px] text-[#536259]">${prettyDate(session.date, { day: '2-digit', month: 'short', year: 'numeric' })}<small class="mt-1 block text-[9px] text-[#68766c]">${session.time}</small></td><td class="px-2 text-[10px]"><strong class="font-semibold">${escapeHtml(session.subject)}</strong><small class="mt-1 block text-[9px] text-[#68766c]">${escapeHtml(session.source)}</small></td><td class="px-2 text-[10px]">${escapeHtml(activityShort[session.activity] || session.activity)}</td><td class="px-2 text-right text-[10px] font-semibold">${formatDuration(Number(session.minutes))}</td><td class="whitespace-nowrap px-2.5 text-right"><button class="cursor-pointer border-0 bg-transparent px-1 text-[10px] font-medium text-[#078337] hover:underline" type="button" data-edit="${session.id}">${editId === session.id ? 'Editando' : 'Editar'}</button><button class="cursor-pointer border-0 bg-transparent px-1 text-[10px] text-[#b42318] hover:underline" type="button" data-delete="${session.id}">Excluir</button></td></tr>`).join('') : '<tr><td class="p-6 text-center text-xs text-[#68766c]" colspan="5">Nenhuma sessão encontrada para esta disciplina.</td></tr>'}</tbody></table></div>
		<div class="mt-3 flex items-center justify-between gap-2 text-[9px] text-[#68766c]"><span>Exibindo ${Math.min(pageSize, visible.length)} de ${filtered.length} sessões · Página ${page} de ${pageCount}</span><div class="flex gap-2"><button class="cursor-pointer border-0 bg-transparent text-[#68766c] disabled:opacity-40" type="button" data-page="-1" ${page <= 1 ? 'disabled' : ''}>Anterior</button><button class="cursor-pointer border-0 bg-transparent font-semibold text-[#078337] disabled:opacity-40" type="button" data-page="1" ${page >= pageCount ? 'disabled' : ''}>Próxima →</button></div></div>
		${deleteId ? `<div class="mt-4 rounded-[11px] border border-[#fee2e2] bg-[#fff4f2] p-3.5" role="alertdialog" aria-label="Confirmar exclusão"><div class="flex gap-2.5">${icon('trash', 'mt-0.5 size-4 text-[#b42318]')}<div><strong class="text-[11px]">Excluir sessão de ${escapeHtml(sessions.find((item) => item.id === deleteId)?.subject || '')} em ${prettyDate(sessions.find((item) => item.id === deleteId)?.date || '2026-10-01', { day: '2-digit', month: 'short' })}?</strong><p class="mt-1 text-[10px] text-[#68766c]">O tempo desta sessão será removido dos totais. Esta ação não pode ser desfeita.</p><div class="mt-3 flex gap-2"><button class="h-9 cursor-pointer rounded-lg border border-[#e0e8df] bg-white px-3 text-[10px] font-medium text-[#078337]" type="button" data-cancel-delete>Cancelar</button><button class="h-9 cursor-pointer rounded-lg border border-[#b42318] bg-white px-3 text-[10px] font-medium text-[#b42318]" type="button" data-confirm-delete>Confirmar exclusão</button></div></div></div></div>` : ''}
	</section>
	${editPanel(selected)}`;
}

function editPanel(session) {
	if (!session) return `<aside class="min-w-0 rounded-[17px] border border-dashed border-[#cdd8ce] bg-white p-[21px] text-center text-[11px] text-[#68766c]"><div class="mx-auto grid size-10 place-items-center rounded-full bg-[#f0f4ef] text-[#078337]">${icon('edit')}</div><h2 class="mt-3 text-sm font-semibold text-[#243027]">Editar sessão</h2><p class="mt-1">Escolha uma sessão no histórico para ajustar disciplina, atividade ou duração.</p></aside>`;
	const hours = Math.floor(session.minutes / 60);
	const minutes = session.minutes % 60;
	return `<aside class="min-w-0 rounded-[17px] border border-[#12a34a] bg-white p-[21px] max-[400px]:p-4" aria-labelledby="ax-edit-heading"><div class="flex items-start justify-between gap-3"><div><h2 id="ax-edit-heading" class="m-0 text-lg font-semibold tracking-[-.3px]">Editar sessão</h2><div class="mt-2 flex items-center gap-2 text-[10px]"><span class="rounded-md bg-[#dcfce7] px-2 py-1 text-[#078337]">${escapeHtml(session.source)}</span><span class="text-[#68766c]">${sessionDateLabel(session)}</span></div></div><button class="cursor-pointer border-0 bg-transparent p-0 text-[#68766c]" type="button" data-close-edit aria-label="Fechar edição">${icon('close')}</button></div>
		<p class="mt-4 text-[10px] leading-5 text-[#68766c]">Corrija a disciplina, atividade ou o tempo efetivo de uma sessão concluída.</p><form class="mt-3 grid gap-4" data-edit-form="${session.id}">
			<label class="grid gap-1.5 text-[11px] text-[#536259]">Disciplina *<select class="h-10 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs" name="subject">${subjects.map(({ name }) => `<option ${session.subject === name ? 'selected' : ''}>${name}</option>`).join('')}</select></label><p class="-mt-3 text-[9px] text-[#68766c]">Opções: Matemática, Português e Biologia.</p>
			<label class="grid gap-1.5 text-[11px] text-[#536259]">Tipo de atividade *<select class="h-10 rounded-[10px] border border-[#e0e8df] bg-[#f8faf7] px-3 text-xs" name="activity">${activities.map((activity) => `<option ${session.activity === activity ? 'selected' : ''}>${activity}</option>`).join('')}</select></label>
			<div class="flex items-center justify-between gap-3 rounded-[10px] bg-[#f7faf7] p-3"><div class="text-[10px] leading-5 text-[#68766c]">Tempo originalmente registrado<small class="block">Calculado sem pausas</small></div><strong class="whitespace-nowrap text-xs">${formatDuration(Number(session.minutes))}</strong></div>
			<div><strong class="mb-2 block text-[11px]">Duração ajustada *</strong>${durationFields('edit', hours, minutes)}</div>
			<div class="flex gap-2 rounded-[10px] bg-[#fff7e6] p-3 text-[10px] leading-[1.5] text-[#805b10]">${icon('info', 'mt-px size-4 shrink-0')}<span>Alterações ainda não salvas. Ao salvar, o total da semana é recalculado.</span></div>
			<div class="flex flex-wrap gap-2"><button class="flex h-10 cursor-pointer items-center gap-1.5 rounded-[10px] border-0 bg-[#12a34a] px-3.5 text-[10px] font-semibold text-white" type="submit">${icon('check')}Salvar alterações</button><button class="h-10 cursor-pointer rounded-[10px] border border-[#e0e8df] bg-white px-3 text-[10px] font-medium text-[#078337]" type="button" data-discard-edit>Descartar</button></div>
			<p class="text-[9px] leading-4 text-[#68766c]">O histórico e os indicadores mostram a duração atualizada após salvar. Registros manuais também podem ser editados.</p>
		</form></aside>`;
}

function focusPage() {
	return `<div class="h-dvh w-full min-w-0 overflow-hidden bg-[#f7faf7] font-[Inter,ui-sans-serif,system-ui] text-[#19241c]">${renderStudentSidebar('focus')}<div class="ml-[232px] flex h-full min-w-0 flex-col max-[760px]:ml-[190px] max-[640px]:ml-16">${renderStudentHeader('Foco')}<main class="min-w-0 flex-1 overflow-auto px-8 py-[27px] [scrollbar-color:#c4d0c5_transparent] [scrollbar-width:thin] max-[1100px]:px-6 max-[760px]:px-4 max-[640px]:px-3 max-[640px]:py-4"><div class="mb-[20px] flex flex-wrap items-center justify-between gap-4"><div><h1 class="m-0 text-[30px] leading-[1.2] font-bold tracking-[-1px] max-[760px]:text-[24px]">Foco no que faz você avançar.</h1><p class="mt-1.5 text-sm text-[#68766c] max-[760px]:text-xs">Olá, Lucas. Dê tempo ao seu aprendizado e mantenha seu estudo em dia.</p></div></div>
		<div class="grid grid-cols-[minmax(0,1.8fr)_minmax(320px,.98fr)] items-stretch gap-5 max-[1050px]:grid-cols-1">${focusSessionPanel()}${manualPanel()}</div>
		<div class="my-[18px]">${weekSummary()}</div>
		<div class="grid grid-cols-[minmax(0,1.8fr)_minmax(320px,.98fr)] items-start gap-5 max-[1050px]:grid-cols-1">${historyPanel()}</div>
		<footer class="mt-4 pb-2 text-[10px] text-[#68766c]">Somente disciplinas vinculadas ao seu cadastro</footer></main></div></div>`;
}

export default function renderStudentFocus() {
	return focusPage();
}

export function bindStudentFocus(root) {
	bindStudentShell(root);
	if (timerHandle) clearInterval(timerHandle);
	if (timerStatus === 'running' && !timerStartedAt) timerStartedAt = Date.now();
	if (timerStatus === 'running') {
		timerHandle = setInterval(() => {
			const timer = root.querySelector('[data-timer]');
			if (timer) timer.textContent = timerText(getElapsedSeconds());
		}, 1000);
	}

	root.onclick = (event) => {
		const target = event.target.closest('button');
		if (!target || !root.contains(target)) return;
		if (target.dataset.subject) { selectedSubject = target.dataset.subject; root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.dataset.activity) { selectedActivity = target.dataset.activity; root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.dataset.addMode) { addMode = target.dataset.addMode; root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.dataset.timerAction) {
			const action = target.dataset.timerAction;
			if (action === 'pause' && timerStatus === 'running') { elapsedSeconds = getElapsedSeconds(); timerStatus = 'paused'; timerStartedAt = null; }
			if (action === 'resume' && timerStatus === 'paused') { timerStatus = 'running'; timerStartedAt = Date.now(); }
			if (action === 'start' && timerStatus === 'finished') { elapsedSeconds = 0; timerStatus = 'running'; timerStartedAt = Date.now(); }
			if (action === 'new' && timerStatus === 'finished') { elapsedSeconds = 0; timerStatus = 'paused'; timerStartedAt = null; }
			if (action === 'finish' && timerStatus !== 'finished') {
				const finalSeconds = getElapsedSeconds();
				const minutes = Math.max(1, Math.round(finalSeconds / 60));
				const now = new Date();
				sessions.unshift({ id: `timer-${Date.now()}`, date: now.toISOString().slice(0, 10), time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), subject: selectedSubject, activity: selectedActivity, minutes, source: 'Cronometrada', content: 'Sessão de foco' });
				saveSessions(); page = 1; filterSubject = 'all'; editId = sessions[0].id; elapsedSeconds = finalSeconds; timerStatus = 'finished'; timerStartedAt = null;
			}
			root.innerHTML = focusPage(); bindStudentFocus(root); return;
		}
		if (target.dataset.edit) { editId = target.dataset.edit; deleteId = null; root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.dataset.closeEdit || target.dataset.discardEdit) { editId = null; root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.dataset.delete) { deleteId = target.dataset.delete; root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.hasAttribute('data-cancel-delete')) { deleteId = null; root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.hasAttribute('data-confirm-delete')) {
			sessions = sessions.filter((session) => session.id !== deleteId); if (editId === deleteId) editId = sessions[0]?.id ?? null; deleteId = null; saveSessions(); root.innerHTML = focusPage(); bindStudentFocus(root); return;
		}
		if (target.dataset.page) { page += Number(target.dataset.page); root.innerHTML = focusPage(); bindStudentFocus(root); return; }
		if (target.hasAttribute('data-scroll-manual')) root.querySelector('#ax-manual-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	root.onchange = (event) => {
		if (event.target.matches('[data-history-filter]')) { filterSubject = event.target.value; page = 1; root.innerHTML = focusPage(); bindStudentFocus(root); }
	};

	root.onsubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		if (form.matches('[data-manual-form]')) {
			const values = new FormData(form);
			let minutes;
			let time = '09:00';
			if (addMode === 'duration') minutes = Number(form.querySelector('[data-manual-hours]').value || 0) * 60 + Number(form.querySelector('[data-manual-minutes]').value || 0);
			else {
				const start = String(values.get('start') || ''); const end = String(values.get('end') || '');
				const [startHour, startMinute] = start.split(':').map(Number); const [endHour, endMinute] = end.split(':').map(Number);
				minutes = endHour * 60 + endMinute - (startHour * 60 + startMinute); time = start;
			}
			if (!Number.isFinite(minutes) || minutes < 1) { const message = root.querySelector('[data-manual-message]'); if (message) { message.textContent = 'Informe uma duração válida maior que zero.'; message.classList.add('text-[#b42318]'); } return; }
			const date = String(values.get('date')); const selectedActivityValue = String(values.get('activity'));
			sessions.unshift({ id: `manual-${Date.now()}`, date, time, subject: String(values.get('subject')), activity: selectedActivityValue, minutes, source: 'Manual', content: 'Sessão adicionada manualmente' });
			saveSessions(); page = 1; filterSubject = 'all'; editId = sessions[0].id; root.innerHTML = focusPage(); bindStudentFocus(root); return;
		}
		if (form.matches('[data-edit-form]')) {
			const session = sessions.find((item) => item.id === form.dataset.editForm);
			if (!session) return;
			const minutes = Number(form.querySelector('[data-edit-hours]').value || 0) * 60 + Number(form.querySelector('[data-edit-minutes]').value || 0);
			if (!Number.isFinite(minutes) || minutes < 1) { form.querySelector('[data-edit-minutes]')?.focus(); return; }
			session.subject = form.elements.subject.value; session.activity = form.elements.activity.value; session.minutes = minutes; saveSessions(); root.innerHTML = focusPage(); bindStudentFocus(root);
		}
	};

	root.querySelector('[data-manual-form]')?.addEventListener('reset', () => {
		setTimeout(() => { const message = root.querySelector('[data-manual-message]'); if (message) { message.textContent = 'Rascunho · ainda não adicionado ao histórico'; message.classList.remove('text-[#b42318]'); } }, 0);
	});
}
