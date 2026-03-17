import { useEffect } from "react";
import { getToken, getUser } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export default function AuthInit(){
    const setUser = useAuthStore((state) => state.setUser)

    useEffect(()=> {
        const token = getToken()
        if (!token) {
            setUser(null)
            return
        }
        getUser().then(({data}) => {
            if (data) setUser(data)
            else setUser(null)
        })
    }, [setUser])
    return null
}