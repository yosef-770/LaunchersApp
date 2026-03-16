import { useNavigate } from "react-router";
import { createLauncher } from '../api/launchers';

import LauncherForm from '../comps/LauncherForm';
import style from '../pages/LauncherAddPage.module.css'


export default function AddLauncherPage () {
    let navigate =  useNavigate()

    const handleSubmit = (payload) => {
        createLauncher(payload).then(({data}) => {
            const id = data._id
            if (id) {
                navigate(`/launcher/${id}`)
            } else {
                navigate('/')
            }
        }).catch(() => navigate('/'))
    }

    return (
        <div className={style.page} >
            <h1>Add launcher</h1>
            <LauncherForm onSubmit={handleSubmit} submitType= 'add'/>
        </div>
    )
}