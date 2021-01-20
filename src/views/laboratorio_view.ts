import Laboratorio from '../models/Laboratorio'

export default {
  render(laboratorio: Laboratorio) {
    return {
      id: laboratorio.id,
      nome: laboratorio.nome,
      ativo: laboratorio.ativo,
      endereco: laboratorio.endereco
    }
  },

  renderMany(laboratorios: Laboratorio[]) {
    return laboratorios.map(laboratorio => this.render(laboratorio))
  }
}