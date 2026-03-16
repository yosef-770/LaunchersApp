import * as launchersService from '../services/launchers.service'


async function getAllLauncher(req, res, next) {
    try {
        const launchers = launchersService.getAllLauncher()
        res.json(launchers)
    } catch (err) {
        next(err)
    }
}


async function getLauncherByID(req, res, next) {
    try {
        const launcher = await launchersService.getLauncherByID(req.params.id)
        if (!launcher) res.status(404).json({error: 'not found'})
        res.json(launcher)
    } catch (err) {
        next(err)
    }
}


async function craeteLauncher(req, res, next) {
    try {
        const launcher = await launchersService.craeteLauncher(req.body)
        res.status(201).json(launcher)
        
    } catch (err) {
        next(err)
    }
}

async function updateLauncher(req, res, next) {
    try {
        const launcher = await launchersService.updateLauncher(req.params.id, req.body)
        if (!launcher)res.status(404).json({error: 'not found'})
        res.json(launcher)
    } catch (err) {
        next(err)
    }
}

async function deleteLauncher(req, res, next) {
    try {
        const launcher = await launchersService.deleteLauncher(req.params.id)
        if (!launcher)res.status(404).json({error: 'not found'})
        res.status(204).send()
    } catch (err) {
        next(err)
    }    
}


export {getAllLauncher, getLauncherByID, craeteLauncher, updateLauncher, deleteLauncher }