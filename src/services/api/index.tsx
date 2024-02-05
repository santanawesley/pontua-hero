import axios from "axios";
import md5 from "crypto-js/md5";
import { ICharacters } from "../../types/interfaces";

const baseURL = "https://gateway.marvel.com:443/";
const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

// Caso tivessemos uma Api própria com recursos apenas para usuários logados, nesse arquivo eu recuperaria o
// Token (LocalStorage) e adicionaria ele ao cabeçalho de envio (claro que depende da Api, mas esse é o mais comum).

// Função para gerar o hash MD5
const generateMD5Hash = (timestamp: number) => {
  return md5(`${timestamp}${privateKey}${publicKey}`).toString();
};

const apiCreate = axios.create({
  baseURL,
});

const timestamp = new Date().getTime();
const hash = generateMD5Hash(timestamp);

const api = {
  getCharacters: async () => {
    try {
      const response: ICharacters = await apiCreate.get(
        `/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
      );
      const { data } = response.data;
      return data;
    } catch (error) {
      return { error: true, message: "Erro ao buscar personagens." };
    }
  },
};

export default api;
