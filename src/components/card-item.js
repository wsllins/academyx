// Renderiza um cartão com identificação da disciplina, andamento e ação principal.
// O objeto discipline fornece os textos, percentuais, tópicos e ícone do cartão.
export function CardItem(discipline) {
  return `
    <div class="bg-white discipline-dark:bg-[var(--ax-panel)]! p-5 sm:p-6 rounded-2xl border border-[#e0e8df] discipline-dark:border-[var(--ax-border)]! shadow-sm flex flex-col justify-between min-w-0 w-full">
      <div class="min-w-0">
        <!-- Cabeçalho do Card (Ícone + Categoria + Título) -->
        <div class="flex items-start gap-3 mb-4 min-w-0">
          <div class="w-12 h-12 rounded-2xl bg-[#dcfce7] discipline-dark:bg-[var(--ax-violet-soft)]! text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! flex items-center justify-center shrink-0">
            ${discipline.icon}
          </div>
          <div class="min-w-0 flex-1">
            <span class="text-xs font-normal text-[#68766c] discipline-dark:text-[var(--ax-muted)]! block truncate">${discipline.category}</span>
            <h3 class="text-xl sm:text-2xl font-bold text-[#19241c] discipline-dark:text-[var(--ax-text)]! leading-tight break-words">${discipline.title}</h3>
          </div>
        </div>

        <p class="text-xs text-[#68766c] discipline-dark:text-[var(--ax-muted)]! mb-5 truncate">${discipline.teacher}</p>

        <!-- Barra de Progresso -->
        <div class="space-y-1.5 mb-4">
          <div class="flex justify-between text-xs">
            <span class="text-[#68766c] discipline-dark:text-[var(--ax-muted)]!">Meu progresso</span>
            <span class="font-bold text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]!">${discipline.progress}%</span>
          </div>
          <div class="w-full bg-[#f0f4ef] discipline-dark:bg-[var(--ax-surface)]! rounded-full h-2 overflow-hidden">
            <div class="bg-[#12a34a] discipline-dark:bg-[var(--ax-violet)]! h-2 rounded-full" style="width: ${discipline.progress}%"></div>
          </div>
        </div>

        <!-- Tópicos -->
        <div class="space-y-1 text-xs text-[#68766c] discipline-dark:text-[var(--ax-muted)]! pb-5 border-b border-[#e0e8df] discipline-dark:border-[var(--ax-border)]! min-w-0">
          <p class="truncate">${discipline.completedTopics} de ${discipline.totalTopics} tópicos concluídos</p>
          <p class="text-[#536259] discipline-dark:text-[var(--ax-muted)]! truncate">Em foco: <span class="text-[#536259] discipline-dark:text-[var(--ax-muted)]!">${discipline.focusTopic}</span></p>
        </div>
      </div>

      <!-- Botão de Ação com o cursor-pointer -->
      <div class="pt-4">
        <button class="text-xs font-bold text-[#12a34a] discipline-dark:text-[var(--ax-violet-light)]! hover:text-[#078337] discipline-dark:hover:text-[var(--ax-violet)]! flex items-center gap-1 transition-colors cursor-pointer">
          ${discipline.actionText} &rarr;
        </button>
      </div>
    </div>
  `;
}