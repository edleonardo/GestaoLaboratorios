import Exame from '../models/Exame'

export default {
  render(exame: Exame) {
    return {
      id: exame.id,
      nome: exame.nome,
      tipo: exame.tipo,
      ativo: exame.ativo 
    }
  },

  renderMany(exames: Exame[]) {
    return exames.map(exame => this.render(exame))
  }
}