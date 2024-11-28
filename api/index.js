const express = require('express');
const bodyParser = require('body-parser');
const tarefasRouter = require('./routes/tarefas');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/tarefas', tarefasRouter);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});