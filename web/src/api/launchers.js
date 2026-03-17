const URL_API = import.meta.env.VITE_URL_API
import { getToken } from './auth.js'

async function req(path, option = {}){
    const headers = {"Content-Type": "application/json", ...option.headers }
    const token =  getToken()

    if (token) headers.Authorization = `Bearer ${token}`
    console.log(headers.Authorization)

    const res = await fetch(`${URL_API}${path}`,{headers, ...option });
      const data = await res.json()
      return {data}

}

const getAllLaunchers = (params = {}) => { 
const q = new URLSearchParams()
if (params.city) q.set('city', params.city)
if (params.rocketType) q.set('rocketType', params.rocketType)
if (params.destroyed) q.set('rocketType', params.destroyed)

const query = q.toString()
if (query) return req('/api/launchers?' + query)
return req('/api/launchers')

}

const getLauncher = (id) => req(`/api/launchers/${id}`)

const createLauncher = (objLauncher) => req('/api/launchers', {method: "POST", body: JSON.stringify(objLauncher)})

const updateLauncher = (id, objLauncher) => req(`/api/launchers/${id}`, {method: "PUT", body: JSON.stringify(objLauncher)})

const deleteLauncher = (id) => req(`/api/launchers/${id}`, {method: "DELETE"})

const updateDestroyed = (id, destroyed) => req(`/api/launchers/${id}/destroyed`, {method: "PUT", body: JSON.stringify({destroyed})})


export {getAllLaunchers, getLauncher, createLauncher, updateLauncher, deleteLauncher, updateDestroyed }