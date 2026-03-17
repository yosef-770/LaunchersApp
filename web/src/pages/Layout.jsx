import { Outlet, Link, useNavigate, Navigate } from 'react-router'
import { useAuthStore } from '../store/authStore'
import { getToken, getUser } from '../api/auth'
import style from './Layout.module.css'

export default function Layout() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const initialized = useAuthStore((state) => state.initialized)
  const setUser = useAuthStore((state) => state.setUser)
  const clearUser = useAuthStore((state) => state.clearUser)

  const handleLogout = () => {
    localStorage.removeItem('token')
    clearUser()
    navigate('/login')
  }

  const handleGetUser = () => {
    const token = getToken()
    if (!token) {
      navigate('/login')
      return
    }
    getUser().then(({ data, ok }) => {
      if (!ok || !data) {
        navigate('/login')
        return
      }
      setUser(data)
      alert(`Username: ${data.username}, User type: ${data.user_type}`)
    })
  }

  if (!initialized) return <p>hkkhjb</p>
  if (!user) return <Navigate to="/login" replace />

  const canWrite = user.user_type === 'admin' || user.user_type === 'Intelligence'
  const isAdmin = user.user_type === 'admin'

  return (
    <div className={style.app}>
      <nav className={style.nav}>
        <Link to="/">Home</Link>
        {canWrite && <Link to="/AddLauncher">Add Launcher</Link>}
        {isAdmin && <Link to="/register">Register</Link>}
        <button type="button" onClick={handleGetUser} className={style.navBtn}>
          Get user
        </button>
        <button type="button" onClick={handleLogout} className={style.navBtn}>
          Logout
        </button>
      </nav>
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  )
}