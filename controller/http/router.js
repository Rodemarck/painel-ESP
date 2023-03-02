import express from "express";
import {recebe_info} from "../core/controlador_dados.js";

const router = express.Router()

router.post('/dados',(req,res,next)=>{
    let info = Object.assign({nome:req.params.nome},req.body)
    recebe_info(req.body)
    res.sendStatus(200)
})

router.get('/',(req,res)=>{
    res.render('dashboard',{
        titulo:'alguma coisa ai'
    })
})

export default app=> app.use('/',router)

