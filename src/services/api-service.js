const demoAccounts = [
	{
		identifier: 'aluno@academyx.com',
		password: 'academyx123',
		user: { id: 'student-1', name: 'Lucas Oliveira', email: 'aluno@academyx.com', role: 'student' },
	},
	{
		identifier: 'professor@academyx.com',
		password: 'academyx123',
		user: { id: 'teacher-1', name: 'Ana Souza', email: 'professor@academyx.com', role: 'teacher' },
	},
	{
		identifier: 'admin@academyx.com',
		password: 'academyx123',
		user: { id: 'admin-1', name: 'Marina Costa', email: 'admin@academyx.com', role: 'admin' },
	},
];

export async function authenticate(identifier, password) {
	await new Promise((resolve) => window.setTimeout(resolve, 450));

	const account = demoAccounts.find(({ identifier: accountIdentifier, password: accountPassword }) => (
		accountIdentifier === identifier.trim().toLowerCase() && accountPassword === password
	));

	if (!account) {
		throw new Error('E-mail ou senha inválidos. Confira seus dados e tente novamente.');
	}

	return { ...account.user };
}
