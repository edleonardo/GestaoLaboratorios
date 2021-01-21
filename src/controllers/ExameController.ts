import { Request, Response } from 'express'
import { getConnection, getRepository, In } from 'typeorm'
import * as Yup from 'yup'

import Exame from '../models/Exame'
import TipoExame from '../models/TipoExame'
import exameView from '../views/exame_view'

async function validaExame (exame: { nome: string, tipo: TipoExame, ativo: boolean }, response: Response) {
  try {
    const exameRepository = getRepository(Exame)
    const exameRepetido = await exameRepository.find({ where: { nome: exame.nome }})
    if (exameRepetido.length) return response.status(400).json({ error: 'Não é possível cadastrar nomes repetidos' })

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      tipo: Yup.number().required(),
      ativo: Yup.boolean().required()
    })
    await schema.validate(exame, { abortEarly: false })
  } catch (error) {
    return response.status(500).json({ error: 'Ocorreu um erro interno'})    
  }
}

export default {
  async create(request: Request, response: Response) {
    const exameRepository = getRepository(Exame)
    if (!Array.isArray(request.body)) {
      const { 
        nome, 
        tipo,
        ativo
      } = request.body

      await validaExame({ nome, tipo, ativo }, response)
      const exame = exameRepository.create({
        nome, 
        tipo,
        ativo
      });
  
      await exameRepository.save(exame);
      return response.status(201).json(exame);
    } else {
      const payload = request.body
      payload.forEach(async (element: Exame) => { await validaExame(element, response) })      
      const insertResponse = await getConnection().createQueryBuilder().insert().into(Exame).values(payload).execute()
      const exames = await exameRepository.findByIds(insertResponse.identifiers)

      return response.status(201).json(exameView.renderMany(exames))
    } 
  },

  async index(request: Request, response: Response) {
    const exameRepository = getRepository(Exame)
    const exames = await exameRepository.find({
      where: [{ ativo: true }],
      relations: ['tipo']
    })

    return response.json(exameView.renderMany(exames))
  },

  async delete(request: Request, response: Response) {
    const exameRepository = getRepository(Exame)
    const { id } = request.params

    if (id.includes(';')) {
      const ids = id.split(';')
      const parsedIds: number[] = []
      ids.forEach(id => parsedIds.push(parseInt(id)))
      await exameRepository.delete({ id: In(parsedIds)})
    } else {
      await exameRepository.delete(id)
    }

    return response.json('Registro deletado com sucesso')
  },

  async update(request:Request, response: Response) {
    const exameRepository = getRepository(Exame)
    let data = {}
    const { id } = request.params
    if (!id.includes(';')) {
      const { 
        nome, 
        tipo,
        ativo
      } = request.body

      if (tipo) data = { ...data, tipo: tipo }
      if (ativo) data = { ...data, ativo: ativo }
      if (nome) data = { ...data, nome: nome }

      await exameRepository.update(id, data)
      const exame = await exameRepository.findOne(id)
      return response.status(201).json(exame)
    } else {
      const ids = id.split(';')
      const parsedIds: number[] = []
      ids.forEach(id => parsedIds.push(parseInt(id)))

      const { 
        tipo,
        ativo
      } = request.body

      if (tipo) data = { ...data, tipo: tipo }
      if (ativo) data = { ...data, ativo: ativo }

      await getConnection().createQueryBuilder().update(Exame).set(data).whereInIds(parsedIds).execute()
      const exames = await exameRepository.findByIds(parsedIds)
      return response.status(201).json(exames)
    }
  }
}