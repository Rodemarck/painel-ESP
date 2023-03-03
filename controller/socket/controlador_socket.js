const DADOS = {
    sockets:{},
    io:undefined
}
const registra = io =>{
    io.on('connect',socket=>{
        socket.on('disconnect',()=>{
            delete DADOS.sockets[socket.id]
        })
    })
}

export const envia_dado = dado =>{

    DADOS.io.emit('dados',[...dado])

}
export default  io =>{
    if(DADOS.sim) return;
    DADOS.sim = true;
    DADOS.io = io
    registra(io)
}