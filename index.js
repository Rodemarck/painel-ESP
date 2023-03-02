import express from "express";
import * as http from "http";
import {Server} from "socket.io";
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import registra_socket from "./controller/socket/controlador_socket.js";
import router from "./controller/http/router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
//app.use(cookieParser());

const server = http.createServer(app)
const io = new Server(server)

registra_socket(io)
router(app)

server.listen(3000,()=>{
    console.log('ouvindo na porta 3000')
})