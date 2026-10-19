import { renderStudentHeader, renderStudentSidebar, bindStudentShell } from '../../components/header.js';
import { getCurrentUser } from '../../state/auth-state.js';

const participants = [
	{ name: 'Lucas Oliveira', sessions: 28, minutes: 1470, xp: 2840, change: 2, isCurrentUser: true },
	{ name: 'Júlia Santos', sessions: 26, minutes: 1335, xp: 2680, change: 1 },
	{ name: 'Pedro Almeida', sessions: 24, minutes: 1300, xp: 2520, change: -2 },
	{ name: 'Beatriz Lima', sessions: 22, minutes: 1210, xp: 2410, change: 3 },
	{ name: 'Rafael Costa', sessions: 21, minutes: 1140, xp: 2290, change: 1 },
	{ name: 'Mariana Souza', sessions: 20, minutes: 1080, xp: 2180, change: 0 },
	{ name: 'Gabriel Ferreira', sessions: 19, minutes: 1020, xp: 2070, change: -1 },
	{ name: 'Isabela Rocha', sessions: 18, minutes: 960, xp: 1980, change: 2 },
	{ name: 'Enzo Martins', sessions: 17, minutes: 900, xp: 1890, change: -2 },
	{ name: 'Sofia Ribeiro', sessions: 16, minutes: 870, xp: 1810, change: 1 },
	{ name: 'Davi Carvalho', sessions: 16, minutes: 840, xp: 1730, change: 0 },
	{ name: 'Manuela Gomes', sessions: 15, minutes: 810, xp: 1660, change: 1 },
	{ name: 'Miguel Barbosa', sessions: 14, minutes: 780, xp: 1590, change: -1 },
	{ name: 'Laura Mendes', sessions: 14, minutes: 750, xp: 1530, change: 2 },
	{ name: 'Heitor Nunes', sessions: 13, minutes: 720, xp: 1470, change: 0 },
	{ name: 'Valentina Castro', sessions: 13, minutes: 690, xp: 1410, change: 1 },
	{ name: 'Arthur Lima', sessions: 12, minutes: 660, xp: 1350, change: -1 },
	{ name: 'Cecília Alves', sessions: 12, minutes: 630, xp: 1300, change: 1 },
	{ name: 'Bernardo Dias', sessions: 11, minutes: 600, xp: 1250, change: -2 },
	{ name: 'Lívia Cardoso', sessions: 11, minutes: 570, xp: 1200, change: 0 },
	{ name: 'Theo Araújo', sessions: 10, minutes: 540, xp: 1160, change: 1 },
	{ name: 'Alice Monteiro', sessions: 10, minutes: 510, xp: 1120, change: -1 },
	{ name: 'Samuel Moreira', sessions: 9, minutes: 480, xp: 1080, change: 0 },
	{ name: 'Helena Correia', sessions: 9, minutes: 450, xp: 1040, change: 1 },
	{ name: 'Noah Freitas', sessions: 8, minutes: 420, xp: 1000, change: -1 },
	{ name: 'Clara Mendes', sessions: 8, minutes: 390, xp: 960, change: 0 },
	{ name: 'Lorenzo Vieira', sessions: 7, minutes: 360, xp: 920, change: 1 },
	{ name: 'Elisa Fernandes', sessions: 7, minutes: 330, xp: 880, change: -1 },
	{ name: 'Benjamin Lopes', sessions: 6, minutes: 300, xp: 840, change: 0 },
	{ name: 'Maitê Batista', sessions: 6, minutes: 270, xp: 800, change: 1 },
	{ name: 'Vicente Teixeira', sessions: 5, minutes: 240, xp: 760, change: -1 },
	{ name: 'Aurora Machado', sessions: 4, minutes: 210, xp: 720, change: 0 },
];

const subjects = ['Geral', 'Matemática', 'Português', 'Biologia'];
const rankingMetrics = [
	{ id: 'xp', label: 'XP' },
	{ id: 'minutes', label: 'Tempo de estudo' },
];
const periods = [
	{ id: 'semester', label: 'Semestre', factor: 1, dateLabel: '2º semestre · Até 03 out. 2026' },
	{ id: 'month', label: 'Este mês', factor: 0.42, dateLabel: 'Outubro · Até 18 out. 2026' },
	{ id: 'week', label: 'Esta semana', factor: 0.12, dateLabel: '12–18 out. 2026' },
];
const pageSize = 4;
let selectedSubject = 'Matemática';
let selectedPeriod = periods[0].id;
let selectedMetric = rankingMetrics[0].id;
let currentPage = 0;
let showRules = false;

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
	'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const formatNumber = (number) => Math.round(number).toLocaleString('pt-BR');
const formatDuration = (minutes) => `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}min`;
const icon = (path, className = 'size-4 shrink-0') => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;

function getRanking() {
	const period = periods.find(({ id }) => id === selectedPeriod);
	const user = getCurrentUser();
	const currentName = user?.name || participants[0].name;

	return participants.map((participant, index) => {
		const subjectMetrics = [
			{ xpFactor: 1, timeFactor: 1, sessionFactor: 1 },
			{ xpFactor: 0.91 + ((index % 4) - 1.5) * 0.025, timeFactor: 0.91, sessionFactor: 0.88 },
			{ xpFactor: 0.84 + ((index % 3) - 1) * 0.03, timeFactor: 0.84, sessionFactor: 0.78 },
		].map(({ xpFactor, timeFactor, sessionFactor }) => ({
			xp: Math.round(participant.xp * xpFactor),
			minutes: Math.round(participant.minutes * timeFactor),
			sessions: Math.round(participant.sessions * sessionFactor),
		}));
		const metrics = selectedSubject === 'Geral'
			? subjectMetrics.reduce((total, subject) => ({
				xp: total.xp + subject.xp,
				minutes: total.minutes + subject.minutes,
				sessions: total.sessions + subject.sessions,
			}), { xp: 0, minutes: 0, sessions: 0 })
			: subjectMetrics[subjects.indexOf(selectedSubject) - 1];
		return {
			...participant,
			name: participant.isCurrentUser ? currentName : participant.name,
			xp: Math.round(metrics.xp * period.factor),
			sessions: Math.max(1, Math.round(metrics.sessions * period.factor)),
			minutes: Math.max(15, Math.round(metrics.minutes * period.factor)),
			change: Math.round(participant.change * period.factor * (selectedSubject === 'Geral' ? 3 : 1)),
		};
	}).sort((first, second) => (
		second[selectedMetric] - first[selectedMetric] || second.xp - first.xp
	));
}

function changeLabel(change) {
	if (change === 0) return '<span class="text-[#68766c]">—</span>';
	const direction = change > 0 ? '↑' : '↓';
	const color = change > 0 ? 'text-[#078337]' : 'text-[#68766c]';
	return `<span class="${color}">${direction} ${Math.abs(change)}</span>`;
}

function renderRules() {
	if (!showRules) return '';
	return `<div class="fixed inset-0 z-30 grid place-items-center bg-black/40 p-4" data-rules-backdrop>
		<section class="w-full max-w-md rounded-2xl border border-[#e0e8df] bg-white p-6 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="xp-rules-title">
			<div class="mb-4 flex items-start justify-between gap-4"><div><h2 id="xp-rules-title" class="text-lg font-semibold">Como ganhar XP</h2><p class="mt-1 text-xs text-[#68766c]">O aprendizado constante também merece reconhecimento.</p></div><button class="grid size-8 cursor-pointer place-items-center rounded-lg text-[#68766c] hover:bg-[#f0f4ef]" type="button" data-close-rules aria-label="Fechar">${icon('<path d="m18 6-12 12M6 6l12 12"/>')}</button></div>
			<div class="grid gap-4 text-xs leading-5"><p><strong class="block text-[#19241c]">Estude com constância</strong><span class="text-[#68766c]">+10 XP a cada 10 min de estudo. Limite de 40 XP por sessão.</span></p><p><strong class="block text-[#19241c]">Resolva questões</strong><span class="text-[#68766c]">Fácil: 10 XP · Média: 20 XP · Difícil: 30 XP por acerto.</span></p><p><strong class="block text-[#19241c]">Ajude a comunidade</strong><span class="text-[#68766c]">+15 XP por resposta útil validada por um professor.</span></p></div>
			<button class="mt-6 h-10 w-full cursor-pointer rounded-[10px] bg-[#12a34a] text-xs font-semibold text-white" type="button" data-close-rules>Entendi</button>
		</section>
	</div>`;
}

function renderPodium(ranking) {
	const topThree = [
		{ participant: ranking[1], height: 'min-h-[170px]' },
		{ participant: ranking[0], height: 'min-h-[210px]' },
		{ participant: ranking[2], height: 'min-h-[150px]' },
	];
	const metricLabel = selectedMetric === 'xp' ? 'XP' : 'de estudo';
	return `<section class="grid grid-cols-3 items-end gap-[18px] max-[760px]:grid-cols-1 max-[760px]:items-stretch" aria-label="Destaques de ${escapeHtml(selectedSubject)}">
		${topThree.map(({ participant, height }) => {
			const rank = ranking.indexOf(participant) + 1;
			const current = participant.isCurrentUser;
			const primaryStat = selectedMetric === 'xp'
				? `${formatNumber(participant.xp)} XP`
				: formatDuration(participant.minutes);
			const secondaryStat = selectedMetric === 'xp'
				? `${participant.sessions} sessões · ${formatDuration(participant.minutes)} de estudo`
				: `${participant.sessions} sessões · ${formatNumber(participant.xp)} XP`;
			return `<article class="grid ${height} content-center justify-items-center gap-3 rounded-2xl border ${current ? 'border-[#12a34a] bg-[#dcfce7]' : 'border-[#e0e8df] bg-white'} px-4 py-5 text-center">
				<strong class="text-[28px] leading-none ${current ? 'text-[#078337]' : 'text-[#637168]'}">${rank}º</strong>
				<p class="text-sm">${escapeHtml(participant.name)}${current ? ' · Você' : ''}</p>
				<strong class="text-[27px] leading-none font-normal text-[#ed9100]" aria-label="${escapeHtml(primaryStat)} ${metricLabel}">${primaryStat}</strong>
				<small class="text-[10px] text-[#68766c]">${secondaryStat}</small>
			</article>`;
		}).join('')}
	</section>`;
}

function renderTable(ranking) {
	const pageCount = Math.ceil(ranking.length / pageSize);
	const pageRows = ranking.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
	const firstRank = currentPage * pageSize + 1;
	const renderRow = (participant, rank) => `<tr class="h-[70px] border-b border-[#e0e8df] last:border-b-0 ${participant.isCurrentUser ? 'bg-[#dcfce7]' : ''}">
		<td class="px-2 font-semibold ${participant.isCurrentUser ? 'text-[#078337]' : 'text-[#637168]'}">${String(rank + 1).padStart(2, '0')}</td>
		<td class="py-2 pr-3"><div>${escapeHtml(participant.name)}${participant.isCurrentUser ? ' · Você' : ''}</div>${participant.isCurrentUser ? '<span class="mt-1 inline-flex whitespace-nowrap rounded-full bg-white px-2 py-1 text-[8px] font-semibold text-[#078337]">SUA POSIÇÃO</span>' : ''}</td>
		<td>${participant.sessions}</td><td>${formatDuration(participant.minutes)}</td>
		<td class="text-[#ed9100]">${formatNumber(participant.xp)}</td><td>${changeLabel(participant.change)}</td>
	</tr>`;

	return `<section class="min-w-0 rounded-2xl border border-[#e0e8df] bg-white p-5 max-[640px]:p-4" aria-labelledby="ranking-table-title">
		<div class="mb-4"><h2 id="ranking-table-title" class="text-xl font-medium">Classificação ${selectedSubject === 'Geral' ? 'geral' : 'da disciplina'}</h2><p class="mt-3 text-[10px] text-[#68766c]">${selectedMetric === 'xp' ? 'Ordenada por XP' : 'Ordenada por tempo de estudo'} · Variação nesta semana</p></div>
		<div class="overflow-x-auto">
			<table class="w-full min-w-[550px] border-collapse text-left text-xs">
				<thead class="h-9 bg-[#f7faf7] text-[9px] font-normal uppercase text-[#68766c]"><tr><th class="w-[62px] px-2 font-normal">Pos.</th><th class="font-normal">Aluno</th><th class="w-[82px] font-normal">Sessões</th><th class="w-[105px] font-normal">Tempo total</th><th class="w-[96px] font-normal">XP</th><th class="w-[48px] font-normal">Var.</th></tr></thead>
				<tbody>${pageRows.map((participant, index) => renderRow(participant, firstRank + index - 1)).join('')}</tbody>
			</table>
		</div>
		<footer class="mt-4 flex items-center justify-between gap-3 text-[10px] text-[#68766c]">
			<span>Exibindo ${firstRank}–${Math.min(firstRank + pageRows.length - 1, ranking.length)} de ${ranking.length} participantes</span>
			<div class="flex gap-3">
				<button class="cursor-pointer text-[#078337] disabled:cursor-default disabled:opacity-40" type="button" data-page="-1" ${currentPage === 0 ? 'disabled' : ''}>← Anterior</button>
				<button class="cursor-pointer text-[#078337] disabled:cursor-default disabled:opacity-40" type="button" data-page="1" ${currentPage >= pageCount - 1 ? 'disabled' : ''}>Próxima página →</button>
			</div>
		</footer>
	</section>`;
}

function renderInsights(ranking) {
	const current = ranking.find(({ isCurrentUser }) => isCurrentUser) || ranking[0];
	const nextMilestone = Math.ceil((current.xp + 1) / 1000) * 1000;
	const progress = Math.min((current.xp / nextMilestone) * 100, 100);
	const neededXp = Math.max(0, nextMilestone - current.xp);
	return `<aside class="grid content-start gap-4">
		<section class="rounded-2xl border border-[#e0e8df] bg-white p-5">
			<h2 class="mb-4 text-lg font-medium">Como ganhar XP</h2>
			<div class="grid gap-4 text-[11px] leading-[1.5]">
				<p><strong class="block font-semibold">Estude com constância</strong><span class="text-[#68766c]">+10 XP a cada 10 min de estudo. Limite de 40 XP por sessão.</span></p>
				<p><strong class="block font-semibold">Resolva questões</strong><span class="text-[#68766c]">Fácil: 10 XP · Média: 20 XP · Difícil: 30 XP por acerto.</span></p>
				<p><strong class="block font-semibold">Ajude a comunidade</strong><span class="text-[#68766c]">+15 XP por resposta útil validada por um professor.</span></p>
			</div>
		</section>
		<section class="rounded-2xl bg-[#dcfce7] p-5">
			<h2 class="text-base font-medium">Sua próxima marca: ${formatNumber(nextMilestone)} XP</h2>
			<p class="mt-3 text-[10px] leading-4 text-[#68766c]">Faltam ${formatNumber(neededXp)} XP para alcançar sua próxima conquista.</p>
			<div class="mt-3 h-1.5 overflow-hidden rounded-full bg-white/70" role="progressbar" aria-label="Progresso até a próxima marca" aria-valuenow="${Math.round(progress)}" aria-valuemin="0" aria-valuemax="100"><div class="h-full rounded-full bg-[#ed9100]" style="width:${progress}%"></div></div>
			<p class="mt-3 text-[9px] text-[#68766c]">${formatNumber(current.xp)} de ${formatNumber(nextMilestone)} XP · ${escapeHtml(selectedSubject)}</p>
		</section>
	</aside>`;
}

function rankingPage() {
	const ranking = getRanking();
	const period = periods.find(({ id }) => id === selectedPeriod);
	const userRank = ranking.findIndex(({ isCurrentUser }) => isCurrentUser) + 1;

	return `<div class="flex h-dvh w-full min-w-0 overflow-hidden bg-[#f7faf7] font-[Inter,ui-sans-serif,system-ui] text-[#19241c]">
		${renderStudentSidebar('ranking')}
		<div class="ml-[232px] flex h-full min-w-0 flex-1 flex-col max-[760px]:ml-[190px] max-[640px]:ml-16">
			${renderStudentHeader('Ranking')}
			<main class="min-w-0 flex-1 overflow-auto px-8 py-[31px] [scrollbar-color:#c4d0c5_transparent] [scrollbar-width:thin] max-[1100px]:px-6 max-[760px]:px-4 max-[640px]:px-3 max-[640px]:py-4">
				<header class="mb-5 flex flex-wrap items-center justify-between gap-4">
					<div><h1 class="text-[30px] leading-tight font-bold tracking-[-1px] max-[760px]:text-2xl">Constância que merece destaque.</h1><p class="mt-1.5 text-sm text-[#68766c] max-[760px]:text-xs">Cada sessão e cada questão contam. Celebre seu avanço, não só a posição.</p></div>
					<button class="flex h-10 cursor-pointer items-center gap-2 rounded-[10px] bg-[#12a34a] px-4 text-xs font-semibold text-white hover:bg-[#078337]" type="button" data-open-rules>${icon('<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>')}Ver regras de XP</button>
				</header>
				<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
					<div class="flex flex-wrap items-center gap-4">
						<label class="relative"><span class="sr-only">Selecionar ranking</span><select class="h-10 min-w-[125px] cursor-pointer appearance-none rounded-[10px] border border-[#e0e8df] bg-white py-2 pl-3 pr-9 text-xs outline-none focus:border-[#12a34a]" data-subject-select>${subjects.map((subject) => `<option value="${subject}" ${subject === selectedSubject ? 'selected' : ''}>${subject}</option>`).join('')}</select>${icon('<path d="m7 10 5 5 5-5"/>', 'pointer-events-none absolute right-3 top-3 size-4 text-[#637168]')}</label>
						<span class="text-xs text-[#68766c]">${ranking.length} participantes${selectedSubject === 'Geral' ? ' · Todas as disciplinas' : ' · Disciplina do seu cadastro'}</span>
					</div>
					<div class="flex flex-wrap items-center gap-3">
						<div class="inline-flex rounded-[10px] bg-[#f0f4ef] p-1" role="group" aria-label="Ordenar ranking por">${rankingMetrics.map(({ id, label }) => `<button class="h-8 cursor-pointer rounded-[8px] px-3 text-[11px] ${id === selectedMetric ? 'bg-white font-semibold text-[#078337]' : 'text-[#637168]'}" type="button" data-metric="${id}" aria-pressed="${id === selectedMetric}">${label}</button>`).join('')}</div>
						<div class="inline-flex rounded-[10px] bg-[#f0f4ef] p-1" role="group" aria-label="Período do ranking">${periods.map(({ id, label }) => `<button class="h-8 cursor-pointer rounded-[8px] px-3 text-[11px] ${id === selectedPeriod ? 'bg-white font-semibold text-[#078337]' : 'text-[#637168]'}" type="button" data-period="${id}" aria-pressed="${id === selectedPeriod}">${label}</button>`).join('')}</div>
					</div>
				</div>
				<div class="mb-5 flex items-center justify-between gap-3"><h2 class="text-xl font-medium">${selectedSubject === 'Geral' ? 'Destaques do ranking geral' : `Destaques de ${escapeHtml(selectedSubject)}`}</h2><span class="text-[10px] text-[#68766c]">${period.dateLabel}</span></div>
				${renderPodium(ranking)}
				<div class="mt-[22px] grid grid-cols-[minmax(0,1.8fr)_minmax(250px,.65fr)] items-start gap-5 max-[1050px]:grid-cols-1">
					${renderTable(ranking)}
					${renderInsights(ranking)}
				</div>
				<p class="mt-4 pb-1 text-[9px] text-[#68766c]">Sua posição atual: ${userRank}º lugar · Dados demonstrativos</p>
			</main>
		</div>
		${renderRules()}
	</div>`;
}

function rerenderRanking(root) {
	const scrollTop = root.querySelector('main')?.scrollTop ?? 0;
	root.innerHTML = rankingPage();
	bindStudentRanking(root);
	const main = root.querySelector('main');
	if (main) main.scrollTop = scrollTop;
}

export default function renderStudentRanking() {
	return rankingPage();
}

export function bindStudentRanking(root) {
	bindStudentShell(root);

	root.onchange = (event) => {
		if (!event.target.matches('[data-subject-select]')) return;
		selectedSubject = event.target.value;
		currentPage = 0;
		rerenderRanking(root);
	};

	root.onclick = (event) => {
		const button = event.target.closest('button');
		const target = button || (event.target.matches('[data-rules-backdrop]') ? event.target : null);
		if (!target || !root.contains(target)) return;
		if (target.matches('[data-open-rules]')) showRules = true;
		else if (target.matches('[data-close-rules]') || target.matches('[data-rules-backdrop]')) showRules = false;
		else if (target.matches('[data-period]')) {
			selectedPeriod = target.dataset.period;
			currentPage = 0;
		} else if (target.matches('[data-metric]')) {
			selectedMetric = target.dataset.metric;
			currentPage = 0;
		} else if (target.matches('[data-page]')) {
			currentPage += Number(target.dataset.page);
		} else return;
		rerenderRanking(root);
	};

	root.onkeydown = (event) => {
		if (event.key === 'Escape' && showRules) {
			showRules = false;
			rerenderRanking(root);
		}
	};
}