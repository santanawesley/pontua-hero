import axios from "axios";
import md5 from "crypto-js/md5";
import { ICharacters } from "../../types/interfaces";

const baseURL = "https://gateway.marvel.com:443/";
const publicKey = "ee725462221502d8a130c8091ff4f1c7";
const privateKey = "35b80e1e208ed7e6198db0acff75f4a94ab4e7c4";

// Função para gerar o hash MD5
const generateMD5Hash = (timestamp: any) => {
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
