import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'

export default class MomentsController {
    public async store({request, response}: HttpContextContract) {
        const body = request.body()

        const moment = await Moment.create(body)//Fará o insert no bd

        response.status(201)

        return{
            msg: "Momento criado com sucesso",
            data: moment
        }
    }
   
}
