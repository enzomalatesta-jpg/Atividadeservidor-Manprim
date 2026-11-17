import { mkdir, writeFile, readFile } from "node:fs/promises";

// Exercício 2.1
async function salvarHistorico() {
  const lista = [
    { id: 1, usuario: "Carlos", texto: "Salvando no disco!" },
    { id: 2, usuario: "Mariana", texto: "Persistência funcionando!" }
  ];

  await mkdir(new URL("./data/", import.meta.url), { recursive: true });
  const caminhoArquivo = new URL("./data/mensagens-teste.json", import.meta.url);
  await writeFile(caminhoArquivo, JSON.stringify(lista, null, 2), "utf8");
  console.log("Histórico salvo com sucesso!");
}

// Exercício 2.2
async function lerDadosSeguros(nomeArquivo) {
  try {
    const conteudo = await readFile(nomeArquivo, "utf8");
    return JSON.parse(conteudo);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      return [];
    }
    throw erro;
  }
}

await salvarHistorico();
const dados = await lerDadosSeguros(new URL("./data/arquivo-fantasma.json", import.meta.url));
console.log("Resultado com arquivo ausente:", dados);
