import Associacao from '../models/Associacao'

export default {
  render(associacao: Associacao) {
    return {
      nome: associacao.laboratorio.nome
    }
  },

  renderMany(associacoes: Associacao[]) {
    return associacoes.map(associacao => this.render(associacao))
  }
}