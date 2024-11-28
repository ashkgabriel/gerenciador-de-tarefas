const express = require('express');
const router = express.Router();

let tarefas = [];
let nextId = 1;

router.post('/', (req, res) => {
  const { descricao, status } = req.body;
  const novaTarefa = { id: nextId++, descricao, status };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

router.get('/', (req, res) => {
  res.json(tarefas);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const tarefa = tarefas.find(t => t.id === parseInt(id));
  if (tarefa) {
    res.json(tarefa);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { descricao, status } = req.body;
  const tarefa = tarefas.find(t => t.id === parseInt(id));
  if (tarefa) {
    tarefa.descricao = descricao;
    tarefa.status = status;
    res.json(tarefa);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex(t => t.id === parseInt(id));
  if (index !== -1) {
    tarefas.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

module.exports = router;