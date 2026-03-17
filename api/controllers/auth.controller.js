import * as userService from '../services/auth.service.js'


async function register(req, res, next) {
    try {
        const result = userService.register(req.body)
        if (result.error) res.status(400).json({error: result.error})
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
}

async function login(req, res, next) {
    try {
        const {username, password} = req.body
        const result = await userService.login(username, password)
        res.json(result)
    } catch(err) {
        next(err)
    }
}


async function deleteUser(req, res, next) {
    try {
        const user = await userService.deleteUser(req.params.id)
        if (!user) return res.status(404).json({error: 'not fond'})
    } catch (err) {
        next(err)
    }
}


async function updateUser(req, res, next) {
    try {
        const user = await userService.updateUser(req.params.id, req.body)
        if (!user) return res.status(404).json({error: 'not fond'})
    } catch (err) {
        next(err)
    }
}


export {register, login, deleteUser, updateUser}