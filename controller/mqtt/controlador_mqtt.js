import * as mqtt from "mqtt";
import {mqtt_dados} from "./dados_mqtt.js";

const START = new Date().getTime()
const MTTF = 876.0498323157561
const MTTR = 0.5865450040820392
const TIME_DIVISION = 3600000.0
const DELAY = 250
const LAMBDA = 1/MTTF
const LAMBDA2 = 1/MTTR
const OP = -LAMBDA/TIME_DIVISION
const OP2 = -LAMBDA2/TIME_DIVISION


const DADOS = {
    load:false,
    erro:false,
    tempo_ref:0
}

const tempo = ()=> new Date().getTime() - START


const conecta = ()=>{
    console.log('conectando....')
    DADOS.client = mqtt.connect('mqtt://10.0.0.38:9001',{
        username:'fog',
        password:'fog'/*,
        will:{
            topic:'sessao/fog',
            qos:2,
            retain:false,
            payload:'DESLIGANDO'
        }*/
    })
    let client = DADOS.client
    client.on('connect',()=>{
        console.log('conectado')
        client.subscribe('dados/#')
        client.subscribe('sessao/#')
        client.subscribe('comandos/#')
        client.publish('sessao/fog','LIGANDO')
        console.log('conectado!!')
    })

    client.on('message',(topic, message)=>{
        let lista = topic.split('/')
        switch (lista[0]){
            case 'dados':
                let msg = message.toString()
                mqtt_dados(lista,msg.split('::')[1])
                lista.shift()
                client.publish(`preprocessados/${lista[1]}`,msg)
                break;
            case 'comandos':
                break;
        }
    })
}
export const registra_mqtt = () =>{
    if(DADOS.load) return
    DADOS.load = true
    conecta()
    setInterval(()=>{
        let time = tempo()
        let rng = Math.random();
        if(DADOS.erro){
            time -= DADOS.tempo_ref
            let prob = 1- Math.exp(time*OP2)
            console.log(`REPARO ${rng} < ${prob}`)
            if(rng < prob){
                DADOS.erro = false
                conecta()
            }
        }else{
            let prob = 1- Math.exp(time*OP)
            console.log(`ENVIANDO ${rng} < ${prob}`)
            if(rng < prob){
                DADOS.erro = true
                client.publish('sessao/fog','DESLIGANDO')
                DADOS.client.end();
                console.log('desconectado!!')
            }   
        }
    },DELAY)
}
