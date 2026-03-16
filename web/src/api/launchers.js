const URL_API = import.meta.env.VITE_URL_API

async function req(path, option = {}){
      const res = await fetch(`${URL_API}${path}`,{
        ...option,
        headers: {"Content-Type": "application/json", ...option.headers },
      });
      const data = await res.json()
      return {data}

}

const getAllLauncher = () => req('/api/launchers')
const getLauncher = (id) => req(`/api/launchers/${id}`)

const createLauncher = (objLauncher) => req('/api/launchers', {method: "POST", body: JSON.stringify(objLauncher)})

const updateLauncher = (id, objLauncher) => req(`/api/launchers/${id}`, {method: "PUT", body: JSON.stringify(objLauncher)})

const deleteLauncher = (id) => req(`/api/launchers/${id}`, {method: "DELETE"})

export {getAllLauncher, getLauncher, createLauncher, updateLauncher, deleteLauncher }