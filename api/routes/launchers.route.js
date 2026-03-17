import express from 'express'
import * as launchersController from '../controllers/launchers.controller.js'
import { authenticateJWT, adminPermission, writePermission, destroyedPermission } from '../middleware/auth'

const aunchersRouter = express.Router()

aunchersRouter.use(authenticateJWT)

aunchersRouter.get('/', launchersController.getAllLauncher)
aunchersRouter.get('/:id', launchersController.getLauncherByID)

aunchersRouter.post('/', writePermission, launchersController.craeteLauncher)
aunchersRouter.put('/:id', writePermission, launchersController.updateLauncher)

aunchersRouter.put('/:id/destroyed', writePermission, launchersController.destroyedLauncher)

aunchersRouter.delete('/:id', writePermission, launchersController.deleteLauncher)


export default aunchersRouter