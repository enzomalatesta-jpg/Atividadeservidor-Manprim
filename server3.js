import express from "express";
import { lerMensagens, salvarMensagens } from "./store.js";

const app = express();
app.use(express.json());


app.get("/mensagens", async (req, res) => {
  const mensagens = await lerMensagens();
  res.json(mensagens);
});


app.post("/mensagens", async (req, res) => {
  const mensagens = await lerMensagens();
  const novaMensagem = {
    id: Date.now(),
    usuario: req.body.usuario,
    texto: req.body.texto
  };

  mensagens.push(novaMensagem);
  await salvarMensagens(mensagens);

  res.status(201).json(novaMensagem);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
