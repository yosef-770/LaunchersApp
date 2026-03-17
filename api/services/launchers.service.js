import Launcher from "../models/launchers.model.js";

async function getAllLauncher(filters = {}) {
    const q = {}
    if (filters.city) q.city = filters.city
    if (filters.rocketType) q.rocketType = filters.rocketType
    if (filters.destroyed !== undefined) q.destroyed = filters.destroyed === 'true'
    return Launcher.find(q).lean()
}


async function getLauncherByID(id) {
    return Launcher.findById(id).lean()
}


async function craeteLauncher(objLauncher) {
    const launcher = await Launcher.create(objLauncher)
    return launcher.toObject()
}

async function updateLauncher(id, objLauncher) {
    const launcher = await Launcher.findByIdAndUpdate(id,
        {$set: objLauncher},
        {new: true}
    ).lean()

    return launcher;
}

async function deleteLauncher(id) {
    const remove = await Launcher.findByIdAndDelete(id);
    return remove
    
}

async function destroyedLauncher(id, destroyed) {
    const launcher = await Launcher.findByIdAndUpdate(id,
        {destroyed},
        {new: true}
    ).lean()

    return launcher;
}

export {getAllLauncher, getLauncherByID, craeteLauncher, updateLauncher, deleteLauncher, destroyedLauncher }
