import React from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Logout = ()=> {
    const navigate = useNavigate()
    localStorage.removeItem("cookie")
    toast.success("User logged out successfully")
    window.location.assign("/")
    return <>
    </>
}

export default Logout