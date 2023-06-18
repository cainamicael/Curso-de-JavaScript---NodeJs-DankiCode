import {v4 as uuidv4} from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application' //para upload

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
   
}
