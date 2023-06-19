const Picture = require('../models/Picture')
const path = require('path')
const fs = require('fs')

exports.create = async (req, res) => {
    try {

        const { name } = req.body
        const file = req.file

        const picture = new Picture({
            name,
            src: file.path//Quando o multer é passado na rota(upload.single('file')), esse file ganha mais parâmetros
        })

        await picture.save()

        res.json({picture, message: "Imagem salva com sucesso!"})
    } catch (e) {
        res.status(500).json({message: "Erro ao salvar imaagem"})
    }
}

exports.findall = async (req, res) => {
    try {
        const pictures = await Picture.find()
        res.json(pictures)
    } catch (e) {
        res.status(500).json({message: "Erro ao listar imagens"})
    }
}

exports.remove = async (req, res) => {
    try {

        const picture = await Picture.findById(req.params.id)
        
        if(!picture) { return res.status(404).json({message: "Imagem não encontrada"}) }

        fs.unlink(picture.src)

        await picture.remove()
        res.json({ message: "Imagem removida com sucesso" })
    } catch (e) {
        res.status(500).json({message: "Erro ao remover imagem"})
    }
}
