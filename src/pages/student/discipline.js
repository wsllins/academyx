import { CardItem } from '../../components/card-item.js';
import { renderStudentHeader, renderStudentSidebar, bindStudentShell } from '../../components/header.js';

// Caminhos SVG reutilizados pelos ícones exibidos no conteúdo da página.
const iconPaths = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6m-3 0v3"/>',
  playCircle: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/>',
  checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  listChecks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a1 1 0 0 0 1 1h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
};

// Monta um ícone SVG usando o caminho e as classes visuais informados.
const icon = (name, className = 'block size-5 shrink-0') => `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;

// Dados demonstrativos usados para preencher os cartões de disciplinas.
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
    icon: `<div class="flex size-12 items-center justify-center rounded-2xl bg-[#dcfce7] discipline-dark:bg-[var(--ax-violet-soft)]! text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! shrink-0">
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
    icon: `<div class="flex size-12 items-center justify-center rounded-2xl bg-[#dcfce7] discipline-dark:bg-[var(--ax-violet-soft)]! text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! shrink-0">
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
    icon: `<div class="flex size-12 items-center justify-center rounded-2xl bg-[#dcfce7] discipline-dark:bg-[var(--ax-violet-soft)]! text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! shrink-0">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 5.5-4.5 9-10 9Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>`
  }
];

// Monta a estrutura da página, incluindo navegação, busca, cartões e progresso.
export function renderStudentDisciplinePage() {
  const cardsHtml = mockDisciplines.map(item => CardItem(item)).join('');

  return `
    <div class="student-discipline-page h-dvh w-full min-w-0 overflow-hidden bg-[#f7faf7] discipline-dark:bg-[var(--ax-canvas)]! font-[Inter,ui-sans-serif,system-ui] text-[#19241c] discipline-dark:text-[var(--ax-text)]!">
      ${renderStudentSidebar('discipline')}
      <div class="ml-[232px] flex h-full min-w-0 flex-col max-[760px]:ml-[190px] max-[640px]:ml-16">
        ${renderStudentHeader('Disciplinas')}

        <main class="min-w-0 flex-1 overflow-auto px-8 py-[31px] [scrollbar-color:#c4d0c5_transparent] discipline-dark:[scrollbar-color:#4b4652_transparent]! [scrollbar-width:thin] max-[1100px]:px-6 max-[760px]:px-4 max-[760px]:py-[22px] max-[640px]:px-3 max-[640px]:py-4">
          <div class="w-full space-y-6">
            <header class="space-y-1">
              <h1 class="text-3xl font-extrabold text-[#19241c] discipline-dark:text-[var(--ax-text)]! tracking-tight max-[640px]:text-2xl max-[400px]:text-xl max-[400px]:[overflow-wrap:anywhere]">Seu conhecimento em movimento.</h1>
              <p class="text-[#68766c] discipline-dark:text-[var(--ax-muted)]! text-sm">Olá, Lucas. Continue sua jornada nas disciplinas disponíveis no seu cadastro.</p>
            </header>

            <!-- Filtros visuais e informação do semestre. -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div class="inline-flex p-1 bg-[#f0f4ef] discipline-dark:bg-[var(--ax-surface)]! rounded-xl text-xs font-semibold max-[400px]:w-full max-[400px]:flex-wrap" role="group" aria-label="Filtrar disciplinas">
                <button class="px-4 py-2 bg-white discipline-dark:bg-[var(--ax-panel)]! text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! rounded-lg shadow-sm cursor-pointer max-[400px]:flex-1 max-[400px]:px-2" type="button" data-discipline-filter aria-pressed="true">
                  Minhas disciplinas (${mockDisciplines.length})
                </button>
                <button class="px-4 py-2 discipline-dark:bg-transparent! text-[#68766c] discipline-dark:text-[var(--ax-muted)]! hover:text-[#354238] discipline-dark:hover:text-[var(--ax-text)]! cursor-pointer transition-colors max-[400px]:flex-1 max-[400px]:px-2" type="button" data-discipline-filter aria-pressed="false">
                  Em andamento (3)
                </button>
              </div>
              <span class="text-xs text-[#748078] discipline-dark:text-[var(--ax-muted)]!">2º semestre de 2026 · Cadastro ativo</span>
            </div>

            <!-- Busca visual das disciplinas cadastradas. -->
            <div class="relative w-full">
              <span class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#68766c] discipline-dark:text-[var(--ax-muted)]!">
                ${icon('search', 'w-4 h-4 shrink-0')}
              </span>
              <input 
                type="text" 
                placeholder="Buscar nas minhas disciplinas..." 
                class="w-full pl-11 pr-4 py-3 bg-[#f8faf7] discipline-dark:bg-[var(--ax-input)]! border border-[#e0e8df] discipline-dark:border-[var(--ax-border)]! rounded-2xl text-xs text-[#19241c] discipline-dark:text-[var(--ax-text)]! placeholder:text-[#9ca3af] discipline-dark:placeholder:text-[var(--ax-muted)]! focus:outline-none focus:ring-2 focus:ring-emerald-500/20 discipline-dark:focus:ring-[rgb(139_92_246_/_20%)]! focus:border-emerald-500 discipline-dark:focus:border-[var(--ax-violet)]! transition cursor-text"
              />
            </div>

            <!-- Cartões montados pelo componente CardItem. -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              ${cardsHtml}
            </div>

            <!-- Conteúdo em andamento, registro de foco e sessões recentes. -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 items-start">
              <section class="lg:col-span-2 bg-white discipline-dark:bg-[var(--ax-panel)]! p-6 rounded-2xl border border-[#e0e8df] discipline-dark:border-[var(--ax-border)]! shadow-sm space-y-6 min-w-0">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h2 class="text-xl font-bold text-[#19241c] discipline-dark:text-[var(--ax-text)]! truncate">Continue de onde parou</h2>
                    <p class="text-xs text-[#536259] discipline-dark:text-[var(--ax-muted)]! mt-1 font-normal break-words">Matemática / Funções do 2º grau · Prof. Helena Lima</p>
                  </div>
                  <span class="px-3 py-1 bg-[#dcfce7] discipline-dark:bg-[var(--ax-violet-soft)]! text-[#078337] discipline-dark:text-[var(--ax-violet-light)]! font-semibold text-xs rounded-full shrink-0">
                    Em andamento
                  </span>
                </div>

                <div class="inline-flex p-1 bg-[#f0f4ef] discipline-dark:bg-[var(--ax-surface)]! rounded-xl text-xs font-semibold" role="group" aria-label="Visualizar conteúdo ou progresso">
                  <button class="px-4 py-1.5 bg-white discipline-dark:bg-[var(--ax-panel)]! text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! rounded-lg shadow-sm cursor-pointer" type="button" data-progress-tab aria-pressed="true">
                    Conteúdo do tópico
                  </button>
                  <button class="px-4 py-1.5 discipline-dark:bg-transparent! text-[#68766c] discipline-dark:text-[var(--ax-muted)]! hover:text-[#354238] discipline-dark:hover:text-[var(--ax-text)]! cursor-pointer transition-colors" type="button" data-progress-tab aria-pressed="false">
                    Meu progresso
                  </button>
                </div>

                <div class="divide-y divide-[#e0e8df] discipline-dark:divide-[var(--ax-border)]! text-xs">
                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('checkCircle', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-[#19241c] discipline-dark:text-[var(--ax-text)]! text-sm truncate">Introdução às funções quadráticas</h3>
                        <p class="text-[#748078] discipline-dark:text-[var(--ax-muted)]! mt-0.5">Texto · 8 min</p>
                      </div>
                    </div>
                    <button class="text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! hover:text-[#078337] discipline-dark:hover:text-[var(--ax-violet)]! font-bold no-underline shrink-0 cursor-pointer transition-colors">Concluído &rarr;</button>
                  </div>

                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('playCircle', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-[#19241c] discipline-dark:text-[var(--ax-text)]! text-sm truncate">O vértice e a concavidade da parábola</h3>
                        <p class="text-[#748078] discipline-dark:text-[var(--ax-muted)]! mt-0.5">Videoaula · 12 min</p>
                      </div>
                    </div>
                    <button class="text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! hover:text-[#078337] discipline-dark:hover:text-[var(--ax-violet)]! font-bold no-underline shrink-0 cursor-pointer transition-colors">Continuar &rarr;</button>
                  </div>

                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('fileText', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-[#19241c] discipline-dark:text-[var(--ax-text)]! text-sm truncate">Resumo: raízes, vértice e gráfico</h3>
                        <p class="text-[#748078] discipline-dark:text-[var(--ax-muted)]! mt-0.5">PDF · 4 páginas</p>
                      </div>
                    </div>
                    <button class="text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! hover:text-[#078337] discipline-dark:hover:text-[var(--ax-violet)]! font-bold no-underline shrink-0 cursor-pointer transition-colors">Abrir material &rarr;</button>
                  </div>

                  <div class="py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                      ${icon('listChecks', 'block size-6 shrink-0 text-[#12a34a]')}
                      <div class="min-w-0">
                        <h3 class="font-bold text-[#19241c] discipline-dark:text-[var(--ax-text)]! text-sm truncate">Prática: Funções do 2º grau</h3>
                        <p class="text-[#748078] discipline-dark:text-[var(--ax-muted)]! mt-0.5">10 questões publicadas</p>
                      </div>
                    </div>
                    <button class="text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! hover:text-[#078337] discipline-dark:hover:text-[var(--ax-violet)]! font-bold no-underline shrink-0 cursor-pointer transition-colors">Praticar &rarr;</button>
                  </div>
                </div>

                <p class="text-[11px] text-[#748078] discipline-dark:text-[var(--ax-muted)]! pt-2 border-t border-[#e0e8df] discipline-dark:border-[var(--ax-border)]!">
                  Conteúdo disponível no seu cadastro · Sem acesso a rascunhos docentes
                </p>
              </section>

              <aside class="space-y-6 min-w-0">
                <div class="bg-[#e8faf0] discipline-dark:bg-[var(--ax-violet-soft)]! p-6 rounded-2xl border border-[#d3f5df] discipline-dark:border-[var(--ax-border)]! space-y-4">
                  <div class="flex items-center gap-2 text-[#078337] discipline-dark:text-[var(--ax-violet-light)]!">
                    ${icon('timer', 'size-5 text-[#078337] discipline-dark:text-[var(--ax-violet-light)]! shrink-0')}
                    <h3 class="text-base font-semibold text-[#19241c] discipline-dark:text-[var(--ax-text)]!">Hora de avançar</h3>
                  </div>

                  <p class="text-xs text-[#536259] discipline-dark:text-[var(--ax-muted)]! leading-relaxed">
                    Registre uma sessão em Matemática e acompanhe seu tempo de estudo.
                  </p>

                  <div class="text-3xl font-extrabold text-[#19241c] discipline-dark:text-[var(--ax-text)]! tracking-tight py-0.5">
                    00:00
                  </div>

                  <button class="inline-flex items-center gap-2.5 rounded-[13px] bg-[#12a34a] discipline-dark:bg-[var(--ax-violet)]! px-4 py-2.5 text-xs font-semibold text-white shadow-none transition-colors duration-200 hover:bg-[#078337] discipline-dark:hover:bg-[#7c3aed]! focus:outline-none cursor-pointer" aria-label="Iniciar sessão de estudo">
                    <svg class="size-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                    <span>Iniciar sessão de estudo</span>
                  </button>

                  <p class="text-[10px] text-[#68766c] discipline-dark:text-[var(--ax-muted)]! font-normal pt-0.5">
                    +10 XP a cada 10 min · Até 40 XP por sessão
                  </p>
                </div>

                <div class="bg-white discipline-dark:bg-[var(--ax-panel)]! p-6 rounded-2xl border border-[#e0e8df] discipline-dark:border-[var(--ax-border)]! shadow-sm space-y-5">
                  <h3 class="text-base font-semibold text-[#19241c] discipline-dark:text-[var(--ax-text)]!">Suas sessões recentes</h3>

                  <div class="divide-y divide-[#e0e8df] discipline-dark:divide-[var(--ax-border)]! text-xs">
                    <div class="pb-5">
                      <p class="text-[#243027] discipline-dark:text-[var(--ax-text)]! font-normal">Matemática · 50 min · Hoje, 10:20</p>
                      <span class="text-[#f59e0b] text-[11px] font-normal mt-3 block">+40 XP conquistados</span>
                    </div>

                    <div class="pt-5">
                      <p class="text-[#68766c] discipline-dark:text-[var(--ax-muted)]! font-normal">Biologia · 30 min · Ontem, 16:00</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <footer class="pt-4 pb-6 text-xs text-[#748078] discipline-dark:text-[var(--ax-muted)]!">
              Exibindo somente disciplinas vinculadas ao seu cadastro · Atualizado em 03 out., às 14:30
            </footer>
          </div>
        </main>
      </div>
    </div>
  `;
}

export function bindStudentDisciplinePage(root) {
  bindStudentShell(root);

  // Alterna apenas o estado visual e acessível dos grupos de opções, sem trocar o conteúdo.
  const bindToggleGroup = (selector) => {
    const buttons = [...root.querySelectorAll(selector)];
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => {
          const isActive = item === button;
          item.setAttribute('aria-pressed', String(isActive));
          item.classList.toggle('bg-white', isActive);
          item.classList.toggle('discipline-dark:bg-[var(--ax-panel)]!', isActive);
          item.classList.toggle('discipline-dark:bg-transparent!', !isActive);
          item.classList.toggle('text-[#12a34a]', isActive);
          item.classList.toggle('discipline-dark:text-[var(--ax-violet-light)]!', isActive);
          item.classList.toggle('rounded-lg', isActive);
          item.classList.toggle('shadow-sm', isActive);
          item.classList.toggle('text-[#68766c]', !isActive);
          item.classList.toggle('discipline-dark:text-[var(--ax-muted)]!', !isActive);
          item.classList.toggle('hover:text-[#354238]', !isActive);
          item.classList.toggle('discipline-dark:hover:text-[var(--ax-text)]!', !isActive);
        });
      });
    });
  };

  bindToggleGroup('[data-discipline-filter]');
  bindToggleGroup('[data-progress-tab]');
}