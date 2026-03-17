import express from 'express'
import * as authController from '../controllers/auth.controller.js'
import { authenticateJWT, adminPermission } from '../middleware/auth.js'

const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.get('/getUser', authenticateJWT, authController.getUser)

authRouter.get('/getAllusers', authenticateJWT, adminPermission, authController.getAllUsers)
authRouter.post('/register/create', authenticateJWT, adminPermission, authController.getAllUsers)

authRouter.put('/register/update', authenticateJWT, adminPermission, authController.updateUser)
authRouter.delete('/register/delete/:id', authenticateJWT, adminPermission, authController.deleteUser)

export default authRouter
