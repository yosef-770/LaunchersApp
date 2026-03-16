import { useState } from "react";

import style from '../comps/LauncherForm.module.css'

const ROCKET_TYPE = ['Shahab3', 'Fetah110', 'Radwan', 'Kheibar']

export default function LauncherForm({values, onSubmit, submitType}){
    const [name, setName] = useState(values?.name?? '')
    const [city, setCity] = useState(values?.city?? '')
    const [rocketType, setRocketType] = useState(values?.rocketType?? '')
    const [latitude, setLatitude] = useState(values?.latitude?? '')
    const [longitude, setLongitude] = useState(values?.longitude?? '')

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: name,
            city: city,
            rocketType: rocketType,
            latitude: Number(latitude),
            longitude: Number(longitude),
        }
        onSubmit(payload)
    }

 return (
    <div className={style.card}>
        <from onSubmit={handleSubmit} className={style.form}>
        <label>
            Name
            <input
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            className={style.input}
            />
        </label>


                <label>
            city
            <input
            type="text"
            value={city}
            onChange={(e)=> setCity(e.target.value)}
            className={style.input}
            />
        </label>

                <label>
            Rocket type
            <select>
            value={name}
            onChange={(e)=> setRocketType(e.target.value)}
            className={style.input}
                {ROCKET_TYPE.map((type) => (
                    <option key={type} value={type}></option>
                ))}
            </select>
        </label>


            <label>
            Latitude
            <input
            type="number"
            value={latitude}
            onChange={(e)=> setLatitude(e.target.value)}
            className={style.input}
            />
        </label>


            <label>
            longitude
            <input
            type="number"
            value={longitude}
            onChange={(e)=> setLongitude(e.target.value)}
            className={style.input}
            />
        </label>
        </from>

        <button type="submit" className={style.button}>{submitType}</button>
    </div>
 )

}