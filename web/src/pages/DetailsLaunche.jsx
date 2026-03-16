import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import LauncherForm from "../comps/LauncherForm";

import { getLauncher, updateLauncher, deleteLauncher } from "../api/launchers";

import styles from '../pages/LauncherDetailsPage.module.css'

export default function DetailsLaunchePage () {
    const { id } = useParams()
    const navigate = useNavigate()

    const [launcher, setLauncher] = useState('')
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if(!id) return 
        getLauncher(id).then(({data}) => setLauncher(data)).catch(() => setLauncher(null))
    }, [id])

    const handleDelete = () => {
        if (!id) return 
        deleteLauncher(id).then(()=> navigate('/'))
    }

    const handleUpdate = (payload) => {
        if (!id) return
        updateLauncher(id, payload).then(({data}) => {
            setLauncher(data)
            setEditing(false)
        })
    }

    if (launcher === '' ) return <p className={styles.msg}> Not Found</p>

    if (editing) {
        return (
            <div className={styles.page}>
                <h1>Edit launcher</h1>
                <LauncherForm
                values={launcher}
                onSubmit={handleUpdate}
                submitType='Save changes'
                />
            </div>
        )
    }

    return (
        <div className={styles.page}>
        <h1>{launcher.name}</h1>
        <dl className={styles.dl}>
            <dt>City</dt><dd>{launcher.city}</dd>
            <dt>Rocket</dt><dd>{launcher.rocketType}</dd>
            <dt>latitude</dt><dd>{launcher.latitude}</dd>
            <dt>longitude</dt><dd>{launcher.longitude}</dd>
        </dl>
        <div className={styles.action}>
            <button type= "button" onClick={() => setEditing(true)} className={styles.btn}>Edit</button>
            <button type= "button" onClick={handleDelete} className={styles.btnDanger}>Delete</button>


        </div>
        </div>
    )

}