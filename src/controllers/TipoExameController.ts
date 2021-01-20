import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import TipoExame from '../models/TipoExame'
import tipoExameView from '../views/tipoExame_view'

export default {
  async create(request: Request, response: Response) {
    const { nome } = request.body
    const tipoExameRepository = getRepository(TipoExame)
    const data = { nome }

    const schema = Yup.object().shape({
      nome: Yup.string().required()
    })

    await schema.validate(data, { abortEarly: false })
    const payload = tipoExameRepository.create(data)
    await tipoExameRepository.save(payload)

    return response.status(201).json(payload)
  },

  async index(request: Request, response: Response) {
    const tipoExameRepository = getRepository(TipoExame)
    const tiposExame = await tipoExameRepository.find()

    return response.json(tipoExameView.renderMany(tiposExame))
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params

    const tipoExameRepository = getRepository(TipoExame)
    await tipoExameRepository.delete(id)

    return response.json('Registro deletado com sucesso')
  },
}