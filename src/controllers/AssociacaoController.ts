import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'
import * as Yup from 'yup'
import Associacao from '../models/Associacao'
import Exame from '../models/Exame'
import Laboratorio from '../models/Laboratorio'
import associacaoView from '../views/associacao_view'

export default {
  async create(request: Request, response: Response) {
    const { exame, laboratorio } = request.body
    
    const schema = Yup.object().shape({
      exame: Yup.number().required(),
      laboratorio: Yup.number().required()
    })
    await schema.validate({ exame, laboratorio }, { abortEarly: false })
    
    const associacaoRepository = getRepository(Associacao)
    const associacao = associacaoRepository.create({ 
      laboratorio, exame
   });

    await associacaoRepository.save(associacao);
    const associacaoResponse = await associacaoRepository.findOne(associacao.id, {
      relations: ['exame', 'laboratorio']
    })
    return response.status(201).json(associacaoResponse);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params

    const associacaoRepository = getRepository(Associacao)
    await associacaoRepository.delete(id)

    return response.json('Registro deletado com sucesso')
  },
  async index(request: Request, response: Response) {
    const associacaoRepository = getRepository(Associacao)  
    const { exame } = request.query
   
    const associacoes = await associacaoRepository.find({
      relations: ['exame', 'laboratorio'],
    })

    const associacoesToResponse = associacoes.filter(element => element.exame.nome == exame)

    return response.json(associacaoView.renderMany(associacoesToResponse))
  }
}