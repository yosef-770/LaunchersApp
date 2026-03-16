import express from 'express'
import * as launchersController from '../controllers/launchers.controller.js'

const aunchersRouter = express.Router()

aunchersRouter.get('/', launchersController.getAllLauncher)
aunchersRouter.get('/:id', launchersController.getLauncherByID)

aunchersRouter.post('/', launchersController.craeteLauncher)
aunchersRouter.put('/:id', launchersController.updateLauncher)

aunchersRouter.delete('/:id', launchersController.deleteLauncher)

export default aunchersRouter