import TipoExame from '../models/TipoExame'

export default {
  render(tipoExame: TipoExame) {
    return {
      id: tipoExame.id,
      nome: tipoExame.nome
    }
  },

  renderMany(tiposExame: TipoExame[]) {
    return tiposExame.map(tipo => this.render(tipo))
  }
}