import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllLaunchers } from "../api/launchers";
import styles from '../pages/HomePage.module.css'

const ROCKET_TYPE = ['Shahab3', 'Fetah110', 'Radwan', 'Kheibar']


export default function HomePage () {
    const [list, setList] = useState([])
    const [searchCity, setSearchCity] = useState('')
    const [filterType, setFilterType] = useState('')

    useEffect(() => {
        getAllLaunchers({city: searchCity, rocketType: filterType})
        .then(({data}) => setList(data))
    }, [searchCity, filterType])

    return (
        <div className={styles.page}>
            <h1>Launchers</h1>
            <div className={styles.toolbar}>
                <input
                type = "text"
                placeholder="Search by city"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className={styles.input}
                />
                <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={styles.input}
                >
                <option value=""> All</option>
                {ROCKET_TYPE.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
                </select>
            </div>

            <ul className={styles.list}>
                {list.map((item) => (
                    <li key={item._id} > 
                        <Link to={`launcher/${item._id}`} className={styles.link}>
                        {item.name} {item.city} {item.rocketType}
                        </Link>
                    </li>
                ))}
                
            </ul>

                {list.length === 0 && <p className={styles.empty} > Not found Launchers</p>}
        </div>
    )

}