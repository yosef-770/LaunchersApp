import * as authService from '../services/auth.service.js'


async function register(req, res, next) {
    try {
        const result = await authService.register(req.body)
        if (result.error) return res.status(400).json({error: result.error})
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
}

async function login(req, res, next) {
    try {
        const {username, password} = req.body
        const result = await authService.login(username, password)
        res.json(result)
    } catch(err) {
        next(err)
    }
}


async function deleteUser(req, res, next) {
    try {
        const user = await authService.deleteUser(req.params.id)
        if (!user) return res.status(404).json({error: 'not fond'})
    } catch (err) {
        next(err)
    }
}


async function updateUser(req, res, next) {
    try {
        const user = await authService.updateUser(req.params.id, req.body)
        if (!user) return res.status(404).json({error: 'not fond'})
    } catch (err) {
        next(err)
    }
}


async function getAllUsers(req, res, next) {
    try {
        const users = await authService.getAllUsers()
        res.json(users)
    } catch (err) {
        next(err)
    }
    
}


async function getUser(req, res, next) {
    try {
        const user = await authService.getUserByid(req.user.id)
        if (!user) return res.status(404).json({error: 'not found'})
        res.json(user)
    } catch (err) {
        next(err)
    }
}

export {register, login, deleteUser, updateUser, getAllUsers, getUser}