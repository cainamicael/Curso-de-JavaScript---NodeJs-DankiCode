import {v4 as uuidv4} from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application' //para upload
import fs from 'fs'

export default class MomentsController {
    private validationOptions = {
        types: ['image'],
        size:  '2mb'
    }

    public async store({request, response}: HttpContextContract) {
        const body = request.body()
        const image = request.file('image', this.validationOptions)//image é o nome do input

        if(image){
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath(`uploads`), {
                name: imageName
            })//Onde quero que fique guardada no meu server

            body.image = imageName
        }

        const moment = await Moment.create(body)//Fará o insert no bd

        response.status(201)

        return{
            msg: "Momento criado com sucesso",
            data: moment
        }
    }

    public async index() {
        const moments = await Moment.all()//Para listar todos
        return {
            data: moments
        }
    }

    public async show({params}: HttpContextContract) {
        const moment = await Moment.findOrFail(params.id)

        return {
            data: moment
        }
    }

    public async destroy({params}: HttpContextContract) {
        const moment = await Moment.findOrFail(params.id)

        await moment.delete()
        
        //Para remover a imagem
        const imageName = moment.image
        const imagePath = Application.tmpPath(`uploads/${imageName}`);
        fs.unlinkSync(imagePath);
        

        return {
            msg: "Momento excluído e imagem removida com sucesso",
            data: moment
        }
    }

    public async update({params, request}: HttpContextContract) {
        const body = request.body()
        const moment = await Moment.findOrFail(params.id)

        moment.title = body.title
        moment.description = body.description

        if(moment.image != body.image || !moment.image){
            const image = request.file('image', this.validationOptions)

            if(image) {
                const imageName = `${uuidv4()}.${image.extname}`
                await image.move(Application.tmpPath(`uploads`), {
                    name: imageName
                })//Onde quero que fique guardada no meu server

                //Caso não use patch
                if(moment.image) {
                    const actualImage = moment.image
                    const imagePath = Application.tmpPath(`uploads/${actualImage}`);
                    fs.unlinkSync(imagePath);
                }
           
                moment.image = imageName
            }

            await moment.save()

            return {
                message: "Momento atualizado com sucesso",
                data: moment
            }

        }

    }
   
}
