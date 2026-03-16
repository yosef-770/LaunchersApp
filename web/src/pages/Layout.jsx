import { Outlet, Link } from "react-router";
import style from '../pages/Layout.module.css'

export default function Layout () {
    return(
        <div className={style.app}>
            <nav className={style.nav}>
                <Link to= '/'>Home</Link>
                <Link to={'/AddLauncher'}>Add Launcher </Link>
    
            </nav>
            <main className={style.main}>
            <Outlet/>
            </main>
        </div>
    )

}