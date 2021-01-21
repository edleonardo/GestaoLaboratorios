import { Request, Response } from 'express'
import { getConnection, getRepository, In } from 'typeorm'
import * as Yup from 'yup'

import Laboratorio from '../models/Laboratorio'
import laboratorioView from '../views/laboratorio_view'

async function validaLaboratorio (laboratorio: { nome: string, endereco: string, ativo: boolean}, response: Response) {
  try {
    const laboratorioRepository = getRepository(Laboratorio)
    const laboratorioRepetido = await laboratorioRepository.find({ where: { nome: laboratorio.nome }})
    if (laboratorioRepetido.length) return response.status(400).json({ error: 'Não é possível cadastrar nomes repetidos' })

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      endereco: Yup.string().required(),
      ativo: Yup.boolean().required()
    })
    await schema.validate(laboratorio, { abortEarly: false })
  } catch (error) {
    return response.status(500).json({ error: 'Ocorreu um erro interno'})    
  }
}

export default {
  async create(request: Request, response: Response) {
    const laboratorioRepository = getRepository(Laboratorio)
    if (!Array.isArray(request.body)) {
      const { 
        nome, 
        endereco,
        ativo
      } = request.body

      await validaLaboratorio({ nome, endereco, ativo }, response)
      const laboratorio = laboratorioRepository.create({
        nome, 
        endereco,
        ativo
      });
  
      await laboratorioRepository.save(laboratorio);
  
      return response.status(201).json(laboratorio);
    } else {
      const payload = request.body
      payload.forEach(async (element: Laboratorio) => { await validaLaboratorio(element, response) })      
      const insertResponse = await getConnection().createQueryBuilder().insert().into(Laboratorio).values(payload).execute()
      const laboratorios = await laboratorioRepository.findByIds(insertResponse.identifiers)

      return response.status(201).json(laboratorioView.renderMany(laboratorios))
    } 
  },

  async index(request: Request, response: Response) {
    const laboratorioRepository = getRepository(Laboratorio)
    const laboratorios = await laboratorioRepository.find({
      where: [{ ativo: true }]
    })

    return response.json(laboratorioView.renderMany(laboratorios))
  },

  async delete(request: Request, response: Response) {
    const laboratorioRepository = getRepository(Laboratorio)
    const { id } = request.params

    if (id.includes(';')) {
      const ids = id.split(';')
      const parsedIds: number[] = []
      ids.forEach(id => parsedIds.push(parseInt(id)))
      await laboratorioRepository.delete({ id: In(parsedIds)})
    } else {
      await laboratorioRepository.delete(id)
    }

    return response.json('Registro deletado com sucesso')
  },

  async update(request:Request, response: Response) {
    const laboratorioRepository = getRepository(Laboratorio)
    let data = {}
    const { id } = request.params
    if (!id.includes(';')) {
      const { 
        nome, 
        endereco,
        ativo
      } = request.body

      if (endereco) data = { ...data, endereco: endereco }
      if (ativo) data = { ...data, ativo: ativo }
      if (nome) data = { ...data, nome: nome }

      await laboratorioRepository.update(id, data)
      const laboratorio = await laboratorioRepository.findOne(id)
      return response.status(201).json(laboratorio)
    } else {
      const ids = id.split(';')
      const parsedIds: number[] = []
      ids.forEach(id => parsedIds.push(parseInt(id)))

      const { 
        endereco,
        ativo
      } = request.body

      if (endereco) data = { ...data, endereco: endereco }
      if (ativo) data = { ...data, ativo: ativo }

      await getConnection().createQueryBuilder().update(Laboratorio).set(data).whereInIds(parsedIds).execute()
      const laboratorios = await laboratorioRepository.findByIds(parsedIds)
      return response.status(201).json(laboratorios)
    }
  }
}