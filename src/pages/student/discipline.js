import { CardItem } from '../../components/card-item.js';

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
  checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  listChecks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a1 1 0 0 0 1 1h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
};

const icon = (name, className = 'block size-5 shrink-0') => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;

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
            <a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] px-[11px] text-xs text-[#68766c] max-[640px]:justify-center max-[640px]:px-0" href="#/student/dashboard" aria-label="Dashboard">${icon('grid', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Dashboard</span></a>
            <a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] bg-[#dcfce7] px-[11px] text-xs font-semibold text-[#078337] max-[640px]:justify-center max-[640px]:px-0" href="#/student/discipline" aria-current="page" aria-label="Disciplinas">${icon('book', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Disciplinas</span></a>
            <a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] px-[11px] text-xs text-[#68766c] max-[640px]:justify-center max-[640px]:px-0" href="#/student/ranking" aria-label="Ranking">${icon('trophy', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Ranking</span></a>
            <a class="flex h-[45px] cursor-pointer items-center gap-[11px] rounded-[10px] px-[11px] text-xs text-[#68766c] max-[640px]:justify-center max-[640px]:px-0" href="#/student/qa-forum" aria-disabled="true" aria-label="Fórum de dúvidas">${icon('chat', 'block size-[19px] shrink-0')}<span class="max-[640px]:hidden">Fórum de dúvidas</span></a>
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

const mockDisciplines = [
  {
    id: 1,
    title: 'Matemática',
    category: 'Ciências exatas',
    teacher: 'Prof. Helena Lima',
    progress: 75,
    completedTopics: 6,
    totalTopics: 8,
    focusTopic: 'Funções do 2º grau',
    actionText: 'Continuar estudando',
    icon: `<div class="flex size-12 items-center justify-center rounded-2xl bg-[#dcfce7] text-[#12a34a] shrink-0">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <line x1="8" x2="16" y1="6" y2="6" />
              <line x1="16" x2="16" y1="14" y2="18" />
              <path d="M16 10h.01" />
              <path d="M12 10h.01" />
              <path d="M8 10h.01" />
              <path d="M12 14h.01" />
              <path d="M8 14h.01" />
              <path d="M12 18h.01" />
              <path d="M8 18h.01" />
            </svg>
          </div>`
  },
  {
    id: 2,
    title: 'Português',
    category: 'Linguagens',
    teacher: 'Prof. Camila Rocha',
    progress: 50,
    completedTopics: 3,
    totalTopics: 6,
    focusTopic: 'Interpretação de texto',
    actionText: 'Acessar conteúdo',
    icon: `<div class="flex size-12 items-center justify-center rounded-2xl bg-[#dcfce7] text-[#12a34a] shrink-0">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="m5 8 6 6" />
              <path d="m4 14 6-6 2 3" />
              <path d="M2 5h12" />
              <path d="M7 2h1" />
              <path d="m22 22-5-10-5 10" />
              <path d="M14 18h6" />
            </svg>
          </div>`
  },
  {
    id: 3,
    title: 'Biologia',
    category: 'Ciências da natureza',
    teacher: 'Prof. Bruno Mendes',
    progress: 33,
    completedTopics: 2,
    totalTopics: 6,
    focusTopic: 'Genética mendeliana',
    actionText: 'Acessar conteúdo',
    icon: `<div class="flex size-12 items-center justify-center rounded-2xl bg-[#dcfce7] text-[#12a34a] shrink-0">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 5.5-4.5 9-10 9Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>`
  }
];

export function renderStudentDisciplinePage() {
  const cardsHtml = mockDisciplines.map(item => CardItem(item)).join('');

  return `
    <div class="h-dvh w-full min-w-[320px] overflow-hidden bg-[#f7faf7] font-[Inter,ui-sans-serif,system-ui] text-[#19241c]">
      ${sidebar()}
      <div class="ml-[232px] flex h-full min-w-0 flex-col max-[760px]:ml-[190px] max-[640px]:ml-16">
        <header class="z-10 flex h-[88px] min-h-[88px] items-center justify-between gap-6 border-b border-[#e2e9e1] bg-white px-8 max-[1100px]:px-4 max-[760px]:h-[70px] max-[760px]:min-h-[70px] max-[760px]:gap-3 max-[760px]:px-4 max-[640px]:h-14 max-[640px]:min-h-14 max-[640px]:px-3">
          <div class="whitespace-nowrap text-xs text-[#19241c] max-[640px]:hidden">Aluno / Disciplinas</div>
          <div class="flex items-center gap-[23px] max-[760px]:gap-[9px]">
            <label class="flex h-10 w-[308px] cursor-text items-center gap-2.5 rounded-[11px] border border-[#e0e8df] bg-[#f8faf7] px-[11px] text-[#68766c] max-[1100px]:w-[min(210px,34vw)]">
              <span class="pointer-events-none">${icon('search', 'block size-[17px] shrink-0')}</span>
              <input class="w-full min-w-0 bg-transparent text-xs text-[#19241c] outline-none placeholder:text-[#68766c]" type="search" placeholder="Buscar na plataforma..." aria-label="Buscar na plataforma">
            </label>
            <button class="grid h-8 w-[30px] cursor-pointer place-items-center border-0 border-r border-[#e0e8df] bg-transparent pr-[18px] text-[#68766c] max-[760px]:hidden" type="button" aria-label="Notificações">
              ${icon('bell', 'block size-[21px] shrink-0')}
            </button>
            <div class="flex cursor-pointer items-center gap-2.5 whitespace-nowrap">
              <span class="grid size-9 place-items-center rounded-full bg-[#dcfce7] text-[10px] font-semibold text-[#078337]">LO</span>
              <span class="max-[760px]:hidden">
                <strong class="block text-[11px] font-semibold">Lucas Oliveira</strong>
                <small class="mt-0.5 block text-[9px] text-[#68766c]">Aluno</small>
              </span>
            </div>
          </div>
        </header>

        <main class="min-w-0 flex-1 overflow-auto px-8 py-[31px] [scrollbar-color:#c4d0c5_transparent] [scrollbar-width:thin] max-[1100px]:px-6 max-[760px]:px-4 max-[760px]:py-[22px] max-[640px]:px-3 max-[640px]:py-4">
          <div class="w-full space-y-6">
            <header class="space-y-1">
              <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Seu conhecimento em movimento.</h1>
              <p class="text-gray-500 text-sm">Olá, Lucas. Continue sua jornada nas disciplinas disponíveis no seu cadastro.</p>
            </header>

            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div class="inline-flex p-1 bg-gray-100/70 rounded-xl text-xs font-semibold">
                <button class="px-4 py-2 bg-white text-emerald-600 rounded-lg shadow-sm cursor-pointer">
                  Minhas disciplinas (${mockDisciplines.length})
                </button>
                <button class="px-4 py-2 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
                  Em andamento (3)
                </button>
              </div>
              <span class="text-xs text-gray-400">2º semestre de 2026 · Cadastro ativo</span>
            </div>

            <div class="relative w-full">
              <span class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                ${icon('search', 'w-4 h-4 shrink-0')}
              </span>
              <input 
                type="text" 
                placeholder="Buscar nas minhas disciplinas..." 
                class="w-full pl-11 pr-4 py-3 bg-[#f8faf8] border border-gray-200/80 rounded-2xl text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-text"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              ${cardsHtml}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 items-start">
              <section class="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 min-w-0">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h2 class="text-xl font-bold text-gray-900 truncate">Continue de onde parou</h2>
                    <p class="text-xs text-gray-600 mt-1 font-normal break-words">Matemática / Funções do 2º grau · Prof. Helena Lima</p>
                  </div>
                  <span class="px-3 py-1 bg-emerald-100/70 text-emerald-700 font-semibold text-xs rounded-full shrink-0">
                    Em andamento
                  </span>
                </div>

                <div class="inline-flex p-1 bg-gray-100/70 rounded-xl text-xs font-semibold">
                  <button class="px-4 py-1.5 bg-white text-emerald-600 rounded-lg shadow-sm cursor-pointer">
                    Conteúdo do tópico
                  </button>
                  <button class="px-4 py-1.5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
                    Meu progresso
                  </button>
                </div>

                <div class="divide-y divide-gray-100 text-xs">
                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('checkCircle', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-gray-900 text-sm truncate">Introdução às funções quadráticas</h3>
                        <p class="text-gray-400 mt-0.5">Texto · 8 min</p>
                      </div>
                    </div>
                    <button class="text-emerald-600 hover:text-emerald-700 font-bold no-underline shrink-0 cursor-pointer transition-colors">Concluído &rarr;</button>
                  </div>

                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('playCircle', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-gray-900 text-sm truncate">O vértice e a concavidade da parábola</h3>
                        <p class="text-gray-400 mt-0.5">Videoaula · 12 min</p>
                      </div>
                    </div>
                    <button class="text-emerald-600 hover:text-emerald-700 font-bold no-underline shrink-0 cursor-pointer transition-colors">Continuar &rarr;</button>
                  </div>

                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('fileText', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-gray-900 text-sm truncate">Resumo: raízes, vértice e gráfico</h3>
                        <p class="text-gray-400 mt-0.5">PDF · 4 páginas</p>
                      </div>
                    </div>
                    <button class="text-emerald-600 hover:text-emerald-700 font-bold no-underline shrink-0 cursor-pointer transition-colors">Abrir material &rarr;</button>
                  </div>

                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('listChecks', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-gray-900 text-sm truncate">Prática: Funções do 2º grau</h3>
                        <p class="text-gray-400 mt-0.5">10 questões publicadas</p>
                      </div>
                    </div>
                    <button class="text-emerald-600 hover:text-emerald-700 font-bold no-underline shrink-0 cursor-pointer transition-colors">Praticar &rarr;</button>
                  </div>
                </div>

                <p class="text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                  Conteúdo disponível no seu cadastro · Sem acesso a rascunhos docentes
                </p>
              </section>

              <aside class="space-y-6 min-w-0">
                <div class="bg-[#e8faf0] p-6 rounded-2xl border border-[#d3f5df] space-y-4">
                  <div class="flex items-center gap-2 text-[#0e883f]">
                    ${icon('timer', 'size-5 text-[#0e883f] shrink-0')}
                    <h3 class="text-base font-semibold text-[#19241c]">Hora de avançar</h3>
                  </div>

                  <p class="text-xs text-[#526056] leading-relaxed">
                    Registre uma sessão em Matemática e acompanhe seu tempo de estudo.
                  </p>

                  <div class="text-3xl font-extrabold text-[#19241c] tracking-tight py-0.5">
                    00:00
                  </div>

                  <button class="inline-flex items-center gap-2.5 rounded-[13px] bg-[#129a48] px-4 py-2.5 text-xs font-semibold text-white shadow-none transition-colors duration-200 hover:bg-[#0f853e] focus:outline-none cursor-pointer" aria-label="Iniciar sessão de estudo">
                    <svg class="size-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                    <span>Iniciar sessão de estudo</span>
                  </button>

                  <p class="text-[10px] text-[#6b7a6f] font-normal pt-0.5">
                    +10 XP a cada 10 min · Até 40 XP por sessão
                  </p>
                </div>

                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                  <h3 class="text-base font-semibold text-gray-900">Suas sessões recentes</h3>

                  <div class="divide-y divide-gray-100 text-xs">
                    <div class="pb-5">
                      <p class="text-gray-800 font-normal">Matemática · 50 min · Hoje, 10:20</p>
                      <span class="text-[#f59e0b] text-[11px] font-normal mt-3 block">+40 XP conquistados</span>
                    </div>

                    <div class="pt-5">
                      <p class="text-gray-500 font-normal">Biologia · 30 min · Ontem, 16:00</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <footer class="pt-4 pb-6 text-xs text-gray-400">
              Exibindo somente disciplinas vinculadas ao seu cadastro · Atualizado em 03 out., às 14:30
            </footer>
          </div>
        </main>
      </div>
    </div>
  `;
}