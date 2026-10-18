import { authenticate } from '../services/api-service.js';
import { setCurrentUser } from '../state/auth-state.js';
import { bindThemeToggle, renderThemeToggle } from '../components/header.js';

const icon = (name, className = 'size-5') => {
	const paths = {
		mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
		lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
		eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.5"/>',
		shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
		book: '<path d="M12 7v14m0-14C10.5 5.5 8.5 5 3 5v14c5.5 0 7.5.5 9 2m0-14c1.5-1.5 3.5-2 9-2v14c-5.5 0-7.5.5-9 2"/>',
		chat: '<path d="M21 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L3 20l1.8-4.2A7 7 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s9 2.9 9 7Z"/>',
		trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/>',
		arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
	};

	return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

function brandMark() {
	return `<div class="flex items-center gap-3" aria-label="AcademyX">
		<img src="/logo.svg" data-logo-light="/logo.svg" data-logo-dark="/logo-dark.svg" alt="AcademyX — Aprender é avançar" class="h-10 w-[196px] object-contain object-left" />
	</div>`;
}

function learningCard() {
	return `<section class="min-h-[298px] w-full min-w-0 rounded-2xl border border-[#d8e8dc] bg-white p-7" aria-label="Como a AcademyX ajuda você">
		<div class="flex items-center gap-3">
			<span class="grid size-10 place-items-center rounded-xl bg-[#dcfce7] text-green-600">${icon('book', 'size-6')}</span>
			<div>
				<h2 class="text-sm font-semibold text-[#17251b]">Cada passo conta.</h2>
				<p class="mt-0.5 text-xs text-[#748078]">Uma jornada de aprendizado contínuo</p>
			</div>
		</div>
		<div class="mt-5 grid grid-cols-3 gap-3">
			<div class="flex h-[82px] flex-col items-center justify-center gap-2 rounded-xl bg-[#f7faf7] text-green-600">${icon('book', 'size-6')}<span class="text-[11px] font-semibold text-[#26352a]">Estude</span></div>
			<div class="flex h-[82px] flex-col items-center justify-center gap-2 rounded-xl bg-[#f7faf7] text-green-600">${icon('chat', 'size-6')}<span class="text-[11px] font-semibold text-[#26352a]">Pergunte</span></div>
			<div class="flex h-[82px] flex-col items-center justify-center gap-2 rounded-xl bg-[#f7faf7] text-amber-500">${icon('trophy', 'size-6')}<span class="text-[11px] font-semibold text-[#26352a]">Evolua</span></div>
		</div>
		<div class="mt-4 flex w-full min-w-0 flex-col items-start gap-2 border-t border-[#e4eae2] pt-4 sm:flex-row sm:items-center sm:gap-3">
			<svg class="h-9 w-[100px] shrink-0 text-green-600 sm:w-[132px]" viewBox="0 0 132 38" fill="none" aria-hidden="true"><path d="m2 33 27-9 25 4 26-20 25 6L130 2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
			<div class="min-w-0"><p class="text-xs font-semibold text-[#26352a]">Pequenos passos. Impacto real.</p><p class="mt-0.5 text-[10px] text-[#748078]">Seu conhecimento cresce a cada encontro.</p></div>
		</div>
	</section>`;
}

export default function renderLogin() {
	return `<main class="grid min-h-screen w-full min-w-0 overflow-x-clip bg-[#f8faf7] font-[Inter,ui-sans-serif,system-ui] text-[#17251b] lg:h-screen lg:min-h-0 lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] min-[1280px]:grid-cols-[650px_minmax(0,790px)] min-[1280px]:justify-center">
		<aside class="flex min-w-0 min-h-[760px] flex-col justify-between bg-[#dcfce7] px-6 py-8 sm:px-10 lg:min-h-0 lg:px-12 lg:py-6 min-[1280px]:px-16">
			${brandMark()}
			<div class="mx-auto flex w-full max-w-[522px] flex-col gap-5 py-10 lg:gap-4 lg:py-0">
				<div class="space-y-3">
					<p class="text-[11px] font-semibold uppercase tracking-[0.04em] text-green-700">AcademyX · 2026</p>
					<h1 class="max-w-[522px] text-[clamp(2.25rem,4vw,2.875rem)] font-bold leading-[1.15] tracking-[-0.045em] text-[#17251b]">Seu próximo avanço começa aqui.</h1>
					<p class="max-w-[522px] text-base leading-[1.45] text-[#66766b]">Aprenda com propósito, compartilhe dúvidas e transforme constância em conquistas.</p>
				</div>
				${learningCard()}
			</div>
			<p class="text-[10px] text-[#718077]">AcademyX © 2026 · Feito para evoluir</p>
		</aside>

		<section class="flex min-w-0 min-h-[680px] flex-col items-center justify-center gap-8 bg-[#f8faf7] px-5 py-12 sm:px-8 lg:min-h-0 lg:gap-4 lg:py-6" aria-label="Acesso à AcademyX">
			<div class="w-full max-w-[452px] rounded-2xl border border-[#e1e9e0] bg-white p-6 shadow-[0_8px_30px_rgba(23,37,27,0.025)] sm:p-8 lg:p-6">
				<div class="mb-6 flex flex-col gap-2">
					<h2 class="text-[28px] font-semibold leading-tight tracking-[-0.035em]">Bom ter você de volta.</h2>
					<p class="text-[13px] leading-[1.45] text-[#69776d]">Entre na AcademyX com o seu e-mail.</p>
				</div>
				<form id="login-form" class="flex flex-col gap-5 lg:gap-4" novalidate>
					<label class="flex flex-col gap-2 text-xs font-semibold text-[#26352a]" for="email">
						E-mail
						<span class="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#e4eae2] bg-[#f8faf7] px-[14px] text-[#718077] transition focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
							${icon('mail', 'size-[18px] shrink-0')}
							<input id="email" name="email" type="email" autocomplete="username" placeholder="seu.email@email.com" aria-describedby="email-error" required class="min-w-0 flex-1 bg-transparent text-xs font-normal text-[#26352a] outline-none placeholder:text-[#77847a]" />
						</span>
						<p id="email-error" class="hidden text-[11px] font-normal text-red-700" role="alert"></p>
					</label>
					<label class="flex flex-col gap-2 text-xs font-semibold text-[#26352a]" for="password">
						Senha
						<span class="flex h-12 items-center gap-2.5 rounded-[10px] border border-[#e4eae2] bg-[#f8faf7] px-[14px] text-[#718077] transition focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
							${icon('lock', 'size-[18px] shrink-0')}
							<input id="password" name="password" type="password" autocomplete="current-password" placeholder="Digite sua senha" aria-describedby="password-error" required class="min-w-0 flex-1 bg-transparent text-xs font-normal text-[#26352a] outline-none placeholder:text-[#77847a]" />
							<button id="toggle-password" type="button" class="rounded p-1 text-[#718077] hover:text-green-700 focus-visible:outline-2 focus-visible:outline-green-600" aria-label="Mostrar senha" aria-pressed="false">${icon('eye', 'size-[18px]')}</button>
						</span>
						<p id="password-error" class="hidden text-[11px] font-normal text-red-700" role="alert"></p>
					</label>
					<div class="flex min-h-[17px] items-center justify-between gap-3 text-xs">
						<label for="remember" class="flex cursor-pointer items-center gap-2 text-[#354238]">
							<input id="remember" name="remember" type="checkbox" class="size-[15px] rounded border-[#dce5dc] accent-green-600 focus:ring-green-600" />
							Lembrar acesso
						</label>
						<a id="forgot-password" href="#recuperar-senha" class="font-semibold text-[#15803d] hover:text-green-800 hover:underline">Esqueci minha senha</a>
					</div>
					<button type="submit" class="flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#16a34a] px-4 text-[13px] font-semibold text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 active:scale-[0.99] cursor-pointer">
						Entrar ${icon('arrow', 'size-[18px]')}
					</button>
					<p id="login-feedback" class="hidden text-center text-xs text-[#66766b]" role="status" aria-live="polite"></p>
				</form>

                <div class="flex justify-center items-center min-h-[17px] gap-3 text-xs mt-5">
                    <a id="register-link" href="#cadastrar" class="font-semibold text-[#15803d] hover:text-green-800 hover:underline">Cadastrar-se</a>
                </div>

				<div class="mt-5 flex items-start gap-2 rounded-xl bg-[#f7faf7] px-3 py-3 text-[#15803d]">
					<span class="mt-0.5 shrink-0">${icon('shield', 'size-[17px]')}</span>
					<p class="text-[10px] leading-[1.5] text-[#68766c]">Você é livre para escolher suas disciplinas e organizar seu tempo da maneira que preferir. Não é necessário limitar seu número de matérias.<p>
				</div>
			</div>
			<div class="flex w-full max-w-[452px] flex-col items-center gap-3">
				<p href="#ajuda" class="text-center text-[11px] text-[#718077] hover:text-green-800 hover:underline cursor-pointer">Precisa de ajuda?</p>
				${renderThemeToggle('flex min-h-10 w-full max-w-[220px] cursor-pointer items-center gap-3 rounded-xl border border-[#e1e9e0] bg-white px-4 py-2.5 text-xs text-[#68766c] transition-colors hover:border-[#8b5cf6]', 'font-medium')}
			</div>
		</section>
	</main>`;
}

export function bindLoginInteractions(root) {
	bindThemeToggle(root);
	const password = root.querySelector('#password');
	const toggle = root.querySelector('#toggle-password');
	const form = root.querySelector('#login-form');
	const feedback = root.querySelector('#login-feedback');
	const recovery = root.querySelector('#forgot-password');
	const submitButton = form.querySelector('[type="submit"]');
	const originalButtonContent = submitButton.innerHTML;
	let isSubmitting = false;

	const showFeedback = (message, kind = 'info') => {
		feedback.textContent = message;
		feedback.classList.remove('hidden', 'text-red-700', 'text-[#66766b]', 'text-green-700');
		feedback.classList.add(kind === 'error' ? 'text-red-700' : kind === 'success' ? 'text-green-700' : 'text-[#66766b]');
		feedback.setAttribute('role', kind === 'error' ? 'alert' : 'status');
	};

	const setFieldError = (field, message) => {
		const error = root.querySelector(`#${field.id}-error`);
		field.setAttribute('aria-invalid', String(Boolean(message)));
		error.textContent = message;
		error.classList.toggle('hidden', !message);
	};

	toggle?.addEventListener('click', () => {
		const isPassword = password.type === 'password';
		password.type = isPassword ? 'text' : 'password';
		toggle.setAttribute('aria-pressed', String(isPassword));
		toggle.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
	});

	form?.addEventListener('input', (event) => {
		if (event.target.matches('#email, #password')) setFieldError(event.target, '');
		feedback.classList.add('hidden');
	});

	form?.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (isSubmitting) return;

		const email = form.elements.email;
		const emailValue = email.value.trim();
		const passwordValue = password.value;
		const emailError = !emailValue
			? 'Informe seu e-mail.'
			: email.validity.typeMismatch
				? 'Informe um e-mail válido.'
				: '';
		const passwordError = passwordValue ? '' : 'Informe sua senha.';

		setFieldError(email, emailError);
		setFieldError(password, passwordError);
		if (emailError || passwordError) {
			(emailError ? email : password).focus();
			feedback.classList.add('hidden');
			return;
		}

		isSubmitting = true;
		submitButton.disabled = true;
		submitButton.setAttribute('aria-busy', 'true');
		submitButton.innerHTML = '<span class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true"></span>Entrando...';
		showFeedback('Validando suas credenciais...');

		try {
			const user = await authenticate(emailValue, passwordValue);
			setCurrentUser(user, root.querySelector('#remember').checked);
			showFeedback('Acesso confirmado. Redirecionando...', 'success');
			window.setTimeout(() => {
				window.location.hash = user.role === 'student'
					? '/student/dashboard'
					: user.role === 'teacher'
						? '/teacher/dashboard'
						: '/admin/dashboard';
			}, 500);
		} catch (error) {
			showFeedback(error.message || 'Não foi possível autenticar. Tente novamente.', 'error');
			isSubmitting = false;
			submitButton.disabled = false;
			submitButton.removeAttribute('aria-busy');
			submitButton.innerHTML = originalButtonContent;
		}
	});

	recovery?.addEventListener('click', (event) => {
		event.preventDefault();
		showFeedback('A recuperação de senha ainda não está disponível.');
	});
}
