import Launcher from "../models/launchers.model.js";

async function getAllLauncher() {
    return Launcher.find().lean()
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


export {getAllLauncher, getLauncherByID, craeteLauncher, updateLauncher, deleteLauncher }
