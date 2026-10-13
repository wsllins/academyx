**Como** usuário do sistema,
**quero** realizar login utilizando minhas credenciais,
**para** acessar as funcionalidades correspondentes ao meu perfil.

### Critérios de aceitação

* [ ] A tela deve possuir campo para identificação do usuário.
* [ ] A tela deve possuir campo para senha.
* [ ] Deve existir uma ação para realizar o login.
* [ ] O sistema deve validar as credenciais informadas.
* [ ] O sistema deve informar ao usuário quando as credenciais forem inválidas.
* [ ] Após uma autenticação bem-sucedida, o usuário deve ser direcionado à sua área inicial.
* [ ] O sistema deve identificar o perfil associado ao usuário.
* [ ] O usuário deve acessar a interface correspondente ao seu perfil.
* [ ] O sistema não deve permitir acesso às áreas autenticadas sem login.

### Elementos da interface

* Campo de identificação.
* Campo de senha.
* Botão "Entrar".
* Mensagem de erro de autenticação.
* Link para recuperação de senha.
* Identidade visual do sistema.

### Estados

* Formulário vazio.
* Preenchimento dos campos.
* Erro de validação.
* Credenciais inválidas.
* Autenticação em andamento.
* Autenticação realizada com sucesso.

### Tasks
* [ ] T01 - Desenvolver a interface da tela de login
* [ ] T02 - Implementar lógica de autenticação
* [ ] T03 - Implementar os estados visuais do formulário
* [ ] T04 - Implementar autenticação simulada
* [ ] T05 - Validar o fluxo de autenticação