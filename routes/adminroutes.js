const express = require('express');
const router = express.Router();
const ginasio=require("../models/ginasio");
const lazer=require("../models/lazer");
const quarto=require("../models/quartos");
const restaurante=require("../models/restaurante");
const salaconferencia=require("../models/salaconferencia");
const reserva=require("../models/reservas");
console.log("Entrou na rota do admin");


const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Verifique se esta pasta existe
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Salva com timestamp
    }
});

// Cria o middleware do multer
const upload = multer({ storage: storage });

// Use este middleware na sua rota de upload
router.post('/quarto/', upload.single('imagem'), (req, res) => {
    // A imagem está acessível em req.file
    if (req.file) {
        // Lógica para salvar os dados no banco de dados
        // ...
        res.send("Imagem salva com sucesso!");
    } else {
        res.send("Erro ao salvar a imagem.");
    }
});


///////////////////GINÁSIO////////////////////////////
router.get("/ginasio/",async(req,res)=>{
   // res.sendFile("admin-ginasio.ejs", {root:"./views/admin"});
   const Ginasio= await ginasio.findAll();
   res.render("admin/admin-ginasio",{Ginasio});
});

router.post('/ginasio/', async (req, res) => {
    ginasio.create({
        nome:req.body.ginasionome,
        capacidade:req.body.ginasiocapacidade
    }).then((req,res)=>{
        console.log("Ginasio cadastrado com sucesso");
    }).catch((req,res)=>{
        console.log("Erro ao Cadastrar ginasio");
    })
});

router.post('/ginasio/deletar/', async (req, res) => {
 const id = req.body.id;    
        try {
            // Deletar um ginásio com base no ID
            const deletedGinasio = await ginasio.destroy({
                where: {
                    id_ginasio: id
                }
            });
    
            if (deletedGinasio) {
                res.send(`Ginásio com ID ${id} deletado com sucesso!`);
            } else {
                res.send(`Ginásio com ID ${id} não encontrado.`);
            }
        } catch (error) {
            res.status(500).send(`Erro ao deletar ginásio: ${error.message}`);
        }    
});

router.get('/ginasio/listar/', async (req, res) => {
    try {
        const Ginasio = await ginasio.findAll();
     //   res.sendFile(path.join(__dirname, 'views/admin/admin-ginasio.html'));
       res.render('admin/admin-ginasio', { Ginasio });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Ginasio: ' + error });
    }
});


router.post('/ginasio/pesquisar/', async (req, res) => {

        const id = req.body.id;

        try {
            // Pesquisar um ginásio com base no ID
            const Ginasio = await ginasio.findOne({
                where: {
                    id_ginasio: id
                }
            });
    
            if (Ginasio) {
                res.send(`Ginásio encontrado: Nome - ${Ginasio.nome}, Capacidade - ${Ginasio.capacidade}`);
            } else {
                res.send(`Ginásio com ID ${id} não encontrado.`);
            }
        } catch (error) {
            res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
        }
});



router.put('/ginasio/actualizar/:id', async (req, res) => {
    try {
        const Ginasio = await ginasio.findByPk(req.params.id);
        if (Ginasio) {
            await Ginasio.update(req.body);
            res.status(200).json(Ginasio);
        } else {
            res.status(404).json({ error: 'Ginasio não encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar Ginasio: ' + error });
    }
});


////////////////////////////////////////////


///////////////////lazer////////////////////////////
router.get("/lazer/",async(req,res)=>{
   // res.sendFile("admin-lazer.html",{root:"./views/admin"});
   try {
    const Lazer = await lazer.findAll(); // Exemplo de query usando Sequelize
     res.render("admin/admin-lazer",{Lazer});
    } catch (error) {
    
   }
})
router.post("/lazer/",(req,res)=>{
 lazer.create({
    nome:req.body.lazernome,
    capacidade:req.body.lazercapacidade
 }).then((req,res)=>{
    console.log("Lazer Cadastrado com sucesso");
 }).catch((req,res)=>{
    console.log("Erro ao Salvar um novo Lazer");
 })
});

// Rota para deletar um cliente (DELETE)
router.post('/lazer/deletar/', async (req, res) => {
    const id = req.body.id;

        try {
            // Pesquisar um ginásio com base no ID
            const Lazer = await lazer.destroy({
                where: {
                    id_lazer: id
                }
            });
    
            if (Lazer) {
                res.send(`Ginásio encontrado: Nome - ${Lazer.nome}, Capacidade - ${Lazer.capacidade}`);
            } else {
                res.send(`Ginásio com ID ${id} não encontrado.`);
            }
        } catch (error) {
            res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
        }
});

// Rota para obter todos os clientes (READ)

router.get('/lazer/listar/', async (req, res) => {
   
        const Lazer = await lazer.findAll(); // Exemplo de query usando Sequelize
        // Passar os dados 'lazer' para o EJS
        res.render('admin/admin-lazer', { Lazer: Lazer });
       // res.status(200).json(Lazer);
});


// Rota para obter um cliente específico (READ)
router.post('/lazer/pesquisar/', async (req, res) => {
    const id = req.body.id;

        try {
            // Pesquisar um ginásio com base no ID
            const Lazer = await lazer.findOne({
                where: {
                    id_lazer: id
                }
            });
    
            if (Lazer) {
                res.send(`Ginásio encontrado: Nome - ${Lazer.nome}, Capacidade - ${Lazer.capacidade}`);
            } else {
                res.send(`Ginásio com ID ${id} não encontrado.`);
            }
        } catch (error) {
            res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
        }
});



// Rota para atualizar um cliente (UPDATE)
router.put('/lazer/actualizar/:id', async (req, res) => {
    try {
        const Lazer = await lazer.findByPk(req.params.id);
        if (Lazer) {
            await Lazer.update(req.body);
            res.status(200).json(Lazer);
        } else {
            res.status(404).json({ error: 'lazer não encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar lazer: ' + error });
    }
});
////////////////////////////////////////////


///////////////////quarto////////////////////////////
router.post("/quarto/", upload.single('imagem'), async (req, res) => {
    try {
        await quarto.create({
            capacidade: req.body.Quartoscapacidade,
            preco: req.body.QuartosPreco,
            disponibilidade: req.body.QuartosDisponibilidade,
            descricao: req.body.QuartosDescricao,
            numero_quartos: req.body.NumeroQuartos,
            imagem: req.file.path // Salve o caminho da imagem no banco de dados
        });
        console.log("Quarto cadastrado com sucesso");
        res.redirect('/admin/quarto/listar'); // Redirecionar após o cadastro
    } catch (error) {
        console.log("Erro ao salvar um novo quarto", error);
        res.status(500).send("Erro ao salvar o quarto");
    }
});


router.post('/quarto/deletar/', async (req, res) => {
    const id = req.body.id;

    try {
        // Pesquisar um ginásio com base no ID
        const Quarto = await quarto.destroy({
            where: {
                id_quarto: id
            }
        });

        if (Quarto) {
            res.send(`Ginásio encontrado: Nome - ${Quarto.nome}, Capacidade - ${Quarto.capacidade}`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
    }
});
router.get('/quarto/listar/', async (req, res) => {
    try {
        const Quarto = await quarto.findAll();
        res.status(200).json(Quarto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar quarto: ' + error });
    }
});

router.post('/quarto/pesquisar/', async (req, res) => {
    const id = req.body.id;

    try {
        // Pesquisar um ginásio com base no ID
        const Quarto = await quarto.findOne({
            where: {
                id_quarto: id
            }
        });

        if (Quarto) {
            res.send(`Ginásio encontrado: Nome - ${Quarto.capacidade}, Disponibilidade - ${Quarto.disponibilidade}, Descrição-${Quarto.descricao} ,Número de quartos-${Quarto.numero_quartos}`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
    }
});


router.put('/quarto/actualizar/:id', async (req, res) => {
    try {
        const Quarto = await quarto.findByPk(req.params.id);
        if (Quarto) {
            await Lazer.update(req.body);
            res.status(200).json(Quarto);
        } else {
            res.status(404).json({ error: 'quarto não encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar quarto: ' + error });
    }
});
////////////////////////////////////////////


///////////////////restaurante////////////////////////////
router.get("/restaurante/",async(req,res)=>{
   // res.sendFile("admin-restaurante.html",{root:"./views/admin"});
   const Restaurante=await restaurante.findAll();
   res.render("admin/admin-restaurante",{Restaurante});
})

router.post("/restaurante/",(req,res)=>{
    restaurante.create({
       nome:req.body.restaurantenome,
       capacidade:req.body.restaurantecapacidade
    }).then((req,res)=>{
       console.log("restaurante Cadastrado com sucesso");
    }).catch((req,res)=>{
       console.log("Erro ao Salvar um novo restaurante");
    })
   });
   
router.post('/restaurante/deletar/', async (req, res) => {
    const id = req.body.id;

    try {
        // Pesquisar um ginásio com base no ID
        const Restaurante = await restaurante.destroy({
            where: {
                id_restaurante: id
            }
        });

        if (Restaurante) {
            res.send(`Ginásio encontrado: Nome - ${Restaurante.nome}, Capacidade - ${Restaurante.capacidade}`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
    }
});
router.get('/restaurante/listar/', async (req, res) => {
    try {
        const Restaurante = await restaurante.findAll();
        res.status(200).json(Restaurante);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar restaurante: ' + error });
    }
});

router.post('/restaurante/pesquisar/', async (req, res) => {
    const id = req.body.id;

    try {
        // Pesquisar um ginásio com base no ID
        const Restaurante = await restaurante.findOne({
            where: {
                id_restaurante: id
            }
        });

        if (Restaurante) {
            res.send(`Ginásio encontrado: Nome - ${Restaurante.nome}, Capacidade - ${Restaurante.capacidade}`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
    }
});


router.put('/restaurante/actualizar/:id', async (req, res) => {
    try {
        const Restaurante = await restaurante.findByPk(req.params.id);
        if (Restaurante) {
            await Lazer.update(req.body);
            res.status(200).json(Restaurante);
        } else {
            res.status(404).json({ error: 'restaurante não encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar restaurante: ' + error });
    }
});
////////////////////////////////////////////


///////////////////conferencia////////////////////////////
router.get("/conferencia/",async(req,res)=>{
   // res.sendFile("admin-salaconferencia.html",{root:"./views/admin"});
   const Conferencia=await salaconferencia.findAll();
   res.render("admin/admin-salaconferencia",{Conferencia});
})
router.post("/conferencia/",(req,res)=>{
    salaconferencia.create({
       nome:req.body.Conferenciasnome,
       capacidade:req.body.Conferenciascapacidade
    }).then((req,res)=>{
       console.log("salaconferencia Cadastrado com sucesso");
    }).catch((req,res)=>{
       console.log("Erro ao Salvar um novo salaconferencia");
    })
   });
   
router.post('/conferencia/deletar/', async (req, res) => {
    const id = req.body.id;

    try {
        // Pesquisar um ginásio com base no ID
        const Salaconferencia = await salaconferencia.destroy({
            where: {
                id_salaconferencia: id
            }
        });

        if (Salaconferencia) {
            res.send(`Ginásio encontrado: Nome - ${Salaconferencia.nome}, Capacidade - ${Salaconferencia.capacidade}`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
    }
});
router.get('/conferencia/listar/', async (req, res) => {
    try {
        const Conferencia = await salaconferencia.findAll();
        res.status(200).json(Conferencia);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar conferencia: ' + error });
    }
});

router.post('/conferencia/pesquisar/', async (req, res) => {
    const id = req.body.id;

    try {
        // Pesquisar um ginásio com base no ID
        const Salaconferencia = await salaconferencia.findOne({
            where: {
                id_salaconferencia: id
            }
        });

        if (Salaconferencia) {
            res.send(`Ginásio encontrado: Nome - ${Salaconferencia.nome}, Capacidade - ${Salaconferencia.capacidade}`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
    }
});


router.put('/conferencia/actualizar/:id', async (req, res) => {
    try {
        const conferencia = await salaconferencia.findByPk(req.params.id);
        if (conferencia) {
            await Lazer.update(req.body);
            res.status(200).json(conferencia);
        } else {
            res.status(404).json({ error: 'conferencia não encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar conferencia: ' + error });
    }
});
////////////////////////////////////////////


///////////////////reserva////////////////////////////
router.get("/reserva/",async(req,res)=>{
   // res.sendFile("admin.reservas.html",{root:"./views/admin"});
   const Reserva=await reserva.findAll();
   res.render("admin/admin-reservas",{Reserva});
})

// Rota para obter todos os clientes (READ)
router.get('/reserva/listar/', async (req, res) => {
    try {
        const Reserva = await reserva.findAll();
        res.status(200).json(Reserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar restaurante: ' + error });
    }
});

router.post("/reserva/deletar",async(req,res)=>{
    const id = req.body.id;
    try {
        // Deletar um ginásio com base no ID
        const Reserva = await reserva.destroy({
            where: {
                id: id
            }
        });
    
        if (Reserva) {
            res.send(`Ginásio com ID ${id} deletado com sucesso!`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao deletar ginásio: ${error.message}`);
    }    
});
router.post("/reserva/pesquisar/",async(req,res)=>{
    const id = req.body.id;

    try {
        // Pesquisar um ginásio com base no ID
        const Reserva = await reserva.findOne({
            where: { id: id }
        });
        if (Reserva) {
            res.send(`Ginásio encontrado: Nome - ${Reserva.nome_cliente}, Sobrenome - ${Reserva.apelido}, BI-${Reserva.bi},Email-${Reserva.email}`);
        } else {
            res.send(`Ginásio com ID ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).send(`Erro ao buscar ginásio: ${error.message}`);
    }
})
////////////////////////////////////////////
module.exports = router;
