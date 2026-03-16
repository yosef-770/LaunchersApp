const URL_API = import.meta.env.VITE_URL_API

async function req(path, option = {}){
      const res = await fetch(`${URL_API}${path}`,{
        ...option,
        headers: {"Content-Type": "application/json", ...option.headers },
      });
      const data = await res.json()
      return {data}

}

const getAllLauncher = (params = {}) => { 
const q = new URLSearchParams()
if (params.city) q.set('city', params.city)
if (params.rocketType) q.set('rocketType', params.rocketType)
const query = q.toString()
if (query) return req('/api/launchers?' + query)
return req('/api/launchers')

}

const getLauncher = (id) => req(`/api/launchers/${id}`)

const createLauncher = (objLauncher) => req('/api/launchers', {method: "POST", body: JSON.stringify(objLauncher)})

const updateLauncher = (id, objLauncher) => req(`/api/launchers/${id}`, {method: "PUT", body: JSON.stringify(objLauncher)})

const deleteLauncher = (id) => req(`/api/launchers/${id}`, {method: "DELETE"})

export {getAllLauncher, getLauncher, createLauncher, updateLauncher, deleteLauncher }