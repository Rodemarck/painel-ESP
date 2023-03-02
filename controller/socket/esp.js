import {envia_dado} from "./controlador_socket.js";

export const recebe_dado = dados =>{
    envia_dado(dados)
}