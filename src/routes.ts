
import { Router } from 'express'

import AssociacaoController from './controllers/AssociacaoController'
import LaboratorioController from './controllers/LaboratorioController'
import ExameController from './controllers/ExameController'
import TipoExameController from './controllers/TipoExameController'

const routes = Router()

routes.get('/exames', ExameController.index)
routes.post('/exames', ExameController.create)
routes.delete('/exames/:id', ExameController.delete)
routes.put('/exames/:id', ExameController.update)

routes.get('/laboratorios', LaboratorioController.index)
routes.post('/laboratorios', LaboratorioController.create)
routes.delete('/laboratorios/:id', LaboratorioController.delete)
routes.put('/laboratorios/:id', LaboratorioController.update)

routes.get('/tipos_exame', TipoExameController.index)
routes.post('/tipos_exame', TipoExameController.create)
routes.delete('/tipos_exame/:id', TipoExameController.delete)

routes.get('/associacao', AssociacaoController.index)
routes.post('/associacao', AssociacaoController.create)
routes.delete('/associacao/:id', AssociacaoController.delete)

export default routes