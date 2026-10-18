export function CardItem(discipline) {
  return `
    <div class="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-w-0 w-full">
      <div class="min-w-0">
        <!-- Cabeçalho do Card (Ícone + Categoria + Título) -->
        <div class="flex items-start gap-3 mb-4 min-w-0">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
            ${discipline.icon}
          </div>
          <div class="min-w-0 flex-1">
            <span class="text-xs font-normal text-gray-500 block truncate">${discipline.category}</span>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight break-words">${discipline.title}</h3>
          </div>
        </div>

        <p class="text-xs text-gray-500 mb-5 truncate">${discipline.teacher}</p>

        <!-- Barra de Progresso -->
        <div class="space-y-1.5 mb-4">
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Meu progresso</span>
            <span class="font-bold text-emerald-600">${discipline.progress}%</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div class="bg-emerald-500 h-2 rounded-full" style="width: ${discipline.progress}%"></div>
          </div>
        </div>

        <!-- Tópicos -->
        <div class="space-y-1 text-xs text-gray-500 pb-5 border-b border-gray-100 min-w-0">
          <p class="truncate">${discipline.completedTopics} de ${discipline.totalTopics} tópicos concluídos</p>
          <p class="text-gray-600 truncate">Em foco: <span class="text-gray-600">${discipline.focusTopic}</span></p>
        </div>
      </div>

      <!-- Botão de Ação com o cursor-pointer -->
      <div class="pt-4">
        <button class="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer">
          ${discipline.actionText} &rarr;
        </button>
      </div>
    </div>
  `;
}