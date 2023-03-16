import * as mqtt from "mqtt";
import {mqtt_dados} from "./dados_mqtt.js";

const DADOS = {
    load:false
}
export const registra_mqtt = () =>{
    if(DADOS.load) return
    DADOS.load = true

    console.log('tentando conexão')
    const client = mqtt.connect('mqtt://10.0.0.38:9001',{
        username:'fog',
        password:'fog'
    })
    client.on('connect',()=>{
        console.log('conectado')
        client.subscribe('dados/#')
        client.subscribe('sessao/#')
        client.subscribe('comandos/#')
    })

    client.on('message',(topic, message)=>{
        let lista = topic.split('/')
        switch (lista[0]){
            case 'dados':
                let msg = message.toString()
                mqtt_dados(lista,msg)
                lista.shift()
                client.publish(`processados/${lista.join('/')}`,msg)
                break;
            case 'comandos':
                break;
        }
    })
    DADOS.client = client;
}