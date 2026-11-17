import { mkdir, readFile, writeFile } from "node:fs/promises";

const PASTA_DATA = new URL("./data/", import.meta.url);
const ARQUIVO_MENSAGENS = new URL("./data/mensagens.json", import.meta.url);

export async function lerMensagens() {
  try {
    const conteudo = await readFile(ARQUIVO_MENSAGENS, "utf8");
    const dados = JSON.parse(conteudo);
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    if (erro.code === "ENOENT") {
      return [];
    }
    throw erro;
  }
}

export async function salvarMensagens(mensagens) {
  await mkdir(PASTA_DATA, { recursive: true });
  const textoJson = JSON.stringify(mensagens, null, 2);
  await writeFile(ARQUIVO_MENSAGENS, textoJson, "utf8");
}
