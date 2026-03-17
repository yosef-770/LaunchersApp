import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/auth";
import { useAuthStore } from '../store/authStore'
import style from '../pages/LoginPage.module.css'

export default function LoginPage () {
    const navigate = useNavigate()
    const setUser = useAuthStore((state)=> state.setUser)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login ({username, password}).then(({data, ok}) => {
            if (!ok) {
                setError('Incorrect username or password or system temporarily unavailable')
                return
            }
        setUser(data.user)
        navigate('/')
        })
    }


    return (
        <div className={style.login}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={style.form}>
                <label>
                    Username
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={style.input}
                    />
                </label>
                <label>
                    password
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={style.input}
                    />
                </label>
                {error && <p className={style.error}>{error}</p>}
                <button type = 'submit' className={style.btn}>
                    Login
                </button>
            </form>
        </div>
    )

}