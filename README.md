# Relatório do Projeto

## API

### Estrutura da API

A API é construída usando Express.js e fornece endpoints para gerenciar tarefas. As tarefas são armazenadas em um array em memória para simplicidade. A API suporta as seguintes operações:

- **Criar uma Tarefa (POST /tarefas)**: Adiciona uma nova tarefa ao array `tarefas`.
- **Obter Todas as Tarefas (GET /tarefas)**: Retorna todas as tarefas no array `tarefas`.
- **Obter uma Tarefa por ID (GET /tarefas/:id)**: Retorna uma tarefa específica pelo seu ID.
- **Atualizar uma Tarefa (PUT /tarefas/:id)**: Atualiza uma tarefa específica pelo seu ID.
- **Excluir uma Tarefa (DELETE /tarefas/:id)**: Exclui uma tarefa específica pelo seu ID.

### Endpoints da API

- **POST /tarefas**
  - Corpo da Requisição: `{ "descricao": "Descrição da tarefa", "status": "pendente" }`
  - Resposta: `{ "id": 1, "descricao": "Descrição da tarefa", "status": "pendente" }`

- **GET /tarefas**
  - Resposta: `[ { "id": 1, "descricao": "Descrição da tarefa", "status": "pendente" }, ... ]`

- **GET /tarefas/:id**
  - Resposta: `{ "id": 1, "descricao": "Descrição da tarefa", "status": "pendente" }`

- **PUT /tarefas/:id**
  - Corpo da Requisição: `{ "descricao": "Descrição atualizada", "status": "completa" }`
  - Resposta: `{ "id": 1, "descricao": "Descrição atualizada", "status": "completa" }`

- **DELETE /tarefas/:id**
  - Resposta: `204 No Content`

## Telas

O projeto inclui três telas principais construídas usando React Native:

1. **HomeScreen**
2. **NovaTarefaScreen**
3. **EditarTarefaScreen**

### HomeScreen

A `HomeScreen` exibe uma lista de tarefas e permite que o usuário filtre as tarefas pelo seu status (todas, pendentes, completas). Também fornece botões para navegar para a `NovaTarefaScreen` para adicionar uma nova tarefa e para a `EditarTarefaScreen` para editar uma tarefa existente.

<img src="https://github.com/user-attachments/assets/496d808e-8f12-4636-b55c-d15d1e6b0b0f" alt="simulator screenshot" width="400" />

### NovaTarefaScreen

A `NovaTarefaScreen` permite que o usuário adicione uma nova tarefa. O usuário pode inserir uma descrição para a tarefa e enviá-la. A tarefa é então adicionada ao backend, e o usuário é navegado de volta para a `HomeScreen`.

<img src="https://github.com/user-attachments/assets/185724c9-f3da-4286-b099-778fa435c4bb" alt="simulator screenshot 1" width="400" />

### EditarTarefaScreen

A `EditarTarefaScreen` permite que o usuário edite uma tarefa existente. O usuário pode atualizar a descrição e o status da tarefa. A tarefa atualizada é então salva no backend, e o usuário é navegado de volta para a `HomeScreen`.

<img src="https://github.com/user-attachments/assets/aa8d98ad-2edb-47ca-9eeb-8b60993b6b00" alt="simulator screenshot 2" width="400" />

## Funcionalidades de Interação com o Backend

As telas interagem com a API do backend para realizar operações CRUD nas tarefas. A interação é feita usando a API `fetch` para enviar requisições HTTP para o backend.

### Buscar Tarefas

- **HomeScreen**: Busca todas as tarefas do backend e as exibe em uma lista. As tarefas podem ser filtradas pelo seu status.

### Adicionar uma Tarefa

- **NovaTarefaScreen**: Envia uma requisição POST para o backend para adicionar uma nova tarefa. O usuário é navegado de volta para a `HomeScreen` após a tarefa ser adicionada.

### Atualizar uma Tarefa

- **EditarTarefaScreen**: Envia uma requisição PUT para o backend para atualizar uma tarefa existente. O usuário é navegado de volta para a `HomeScreen` após a tarefa ser atualizada.

### Excluir uma Tarefa

- **HomeScreen**: Envia uma requisição DELETE para o backend para excluir uma tarefa. A tarefa é removida da lista após ser excluída.

## Conclusão

Este projeto demonstra uma aplicação simples de gerenciamento de tarefas com uma API backend construída usando Express.js e um frontend construído usando React Native. A aplicação permite que os usuários criem, leiam, atualizem e excluam tarefas, com os dados sendo armazenados em um array em memória no servidor.
