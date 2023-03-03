import * as mqtt from "mqtt";
import {mqtt_dados} from "./dados_mqtt.js";

const DADOS = {
    load:false
}
export const registra_mqtt = () =>{
    if(DADOS.load) return
    DADOS.load = true
    const client = mqtt.connect('mqtt://rodemarck.site',{
        username:'fog',
        password:'fog1234'
    })
    client.on('connect',()=>{
        client.subscribe('dados/#')
        client.subscribe('sessao/#')
        client.subscribe('comandos/#')
    })

    client.on('message',(topic, message)=>{
        let lista = topic.split('/')

        switch (lista[0]){
            case 'dados':
                mqtt_dados(lista,message.toString())
        }
    })
    DADOS.client = client;
}