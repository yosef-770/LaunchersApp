import { useEffect, useState } from "react";
import { getAllUsers, register, updateUser, deleteUser } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import style from '../pages/RegisterPage.module.css'
import { Navigate } from "react-router";

export default function RegisterPage() {
    const user = useAuthStore((state) => state.user)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [user_type, setUser_type] = useState('')
    const [msg, setMsg] = useState('')
    const [editId, setEditId] = useState(null)
    const [editForm, setEditForm] = useState({})

    useEffect(() => {
        if (user?.user_type !== 'admin') return
        getAllUsers().then(({data}) => {
            if (Array.isArray(data)) setUsers(data)
        })
    }, [user.user_type])

    if (user.user_type !== 'admin') return <Navigate to = '/' replace/>

    const handleCreate = (e) => {
        e.preventDefault()
        register({username, password, email, user_type}).then(({data, ok}) => {
            if (!ok) {
                setMsg('faild')
                return
            }
            if (data.error) {
                setMsg(data.error)
                return
            }
            setUsers((users) => [...users, {...data, _id: data._id}])
            setUsername('')
            setPassword('')
            setEmail('')
        })
    }


    const handleEdit = (user) => {
        setEditId(user._id)
        setEditForm({username: user.username, email: user.email, user_type: user.user_type})
    }


    const handSaveleEdit = (id) => {
        updateUser(id, editForm).then(({data, ok}) => {
            if (!ok) return
        setUsers((users) => users.map((user) => (user.id === id ? {...user, ...data} : user)) )
        setEditId(null)
        })
    }

    const handleDelete = (id) => {
        deleteUser(id).then(({ok}) => {
            if (ok) setUsers((prev) => prev.filter((user) => user._id !== id))

        })
    }

    return (
        <div className={style.page}>
            <h1>Create user</h1>

            <form onSubmit={handleCreate} className={style.form}>
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
                <label>
                    Email
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={style.input}
                    />
                </label>
                <label>
                    User setRocketType
                    <input
                    type="text"
                    value={user_type}
                    onChange={(e) => setUser_type(e.target.value)}
                    className={style.input}
                    />
                </label>
                    {msg && <p className={style.msg}>{msg}</p>}

                    <button type="submit" className={style.btn}>Save</button>

            </form>


            <h2>Users</h2>
            <ul className={style.list}>
            {users.map ((user) => (
                <li key={user._id} className={style.row}>
                    {editId === user._id ? (
                        <>
                        <input 
                        value={editForm.username}
                        onChange={(e) => setEditForm((form) => ({...form, username: e.target.value}))}
                        className={style.input}
                        />
                        <input 
                        value={editForm.email}
                        onChange={(e) => setEditForm((form) => ({...form, email: e.target.value}))}
                        className={style.input}
                        />
                        <input 
                        value={editForm.user_type}
                        onChange={(e) => setEditForm((form) => ({...form, user_type: e.target.value}))}
                        className={style.input}
                        />

                        <button type="button" onClick={() => handSaveleEdit(user._id)} className={style.btn}> Save</button>
                        <button type="button" onClick={() => setEditId(null)} className={style.btn}> Cancel</button>

                        </>

                    ) : (
                        <>
                        <span>{user.username} {user.email} {user.user_type}</span>

                        <button type="button" onClick={() => handleEdit(user)} className={style.btn}> Edit</button>
                        <button type="button" onClick={() => handleDelete(user._id)} className={style.btnDanger}> Cancel</button>                        
                        </>
                    )}
                </li>
            )
            )}

            </ul>

        </div>
    )

}
