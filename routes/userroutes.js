const express = require('express');
const router = express.Router();
//const usercontrollers = require('../controllers/usercontrollers');
const reservas=require("../models/reservas");
console.log("Entrou na rota do USER");

// Exemplo de rota para usuários
//router.get('/home', usercontrollers.getHome);
//router.get('/profile', usercontrollers.getProfile);

router.get("/",(req,res)=>{
    res.sendFile('index.html', { root: './views/user'});
});
router.get("/ginasio",(req,res)=>{
    res.sendFile("ginasio.html", {root:"./views/user"});
});
router.get("/lazer",(req,res)=>{
    res.sendFile("lazer.html",{root:"./views/user"});
})
router.get("/quarto",(req,res)=>{
    res.sendFile("quartos.html",{root:"./views/user"});
})
router.get("/restaurante",(req,res)=>{
    res.sendFile("restaurante.html",{root:"./views/user"});
})
router.get("/conferencia",(req,res)=>{
    res.sendFile("reunioes.html",{root:"./views/user"});
})
router.get("/reserva",(req,res)=>{
    res.sendFile("reservas.html",{root:"./views/user"});
})
router.post("/reserva",(req,res)=>{
    /*nome_cliente,apelido,bi,email,datachekin,datacheckout,quantidade_pessoas,quantidadeQuarto */
    reservas.create({
        nome_cliente:req.body.nome_cliente,
        apelido:req.body.apelido,
        bi:req.body.bi,
        email:req.body.email,
        datachekin:req.body.datachekin,
        datacheckout:req.body.datacheckout,
        quantidade_pessoas:req.body.quantidade_pessoas,
        numeroQuarto:req.body.numeroQuartos
    }).then((req,res)=>{
        console.log("RESERVA FEITA COM SUCESSO");
    }).catch((req,res)=>{
        console.log("FALHA AO FAZER A RESERVA");
    });

});
module.exports = router;
