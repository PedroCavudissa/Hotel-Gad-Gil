const express = require('express');
const multer = require('multer');
const path = require('path');
const Media = require('../models/Media');

const router = express.Router();

// Configuração do multer para upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Rota para carregar a página de upload
router.get('/', (req, res) => {
    res.render('index');
});

// Rota para fazer o upload da imagem/vídeo
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        // Salvar informações do arquivo no banco de dados
        await Media.create({
            file_name: file.filename,
            file_type: file.mimetype,
            file_path: file.path
        });

        res.redirect('/media');
    } catch (error) {
        res.status(500).send('Erro ao fazer upload: ' + error.message);
    }
});

// Rota para listar e exibir os arquivos carregados
router.get('/media', async (req, res) => {
    try {
        const mediaFiles = await Media.findAll();
        res.render('media', { mediaFiles });
    } catch (error) {
        res.status(500).send('Erro ao buscar arquivos: ' + error.message);
    }
});

module.exports = router;
