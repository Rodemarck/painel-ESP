import {envia_dado} from "../socket/controlador_socket.js";

export const mqtt_dados = (lista_topicos, val) => {
    envia_dado([{
        nome:lista_topicos[1],
        val:parseFloat(val)
    }])
}