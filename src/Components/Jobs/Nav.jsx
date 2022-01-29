import styles from "./nav.module.css"
import { useState,useEffect } from "react"
import {useHistory} from "react-router-dom";

export function Nav({handleSearch}) {
    const [user,setUser]=useState({})
    const history = useHistory()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            setUser(user)
        }else {
            history.push("/login")
        }
        setUser(user)
    },[])

    const handleLogout = () => {
        localStorage.removeItem("user")
        history.push("/login")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.imgBox}>
                    <img src="/images/Angel_Lockup.png" alt="" />
                </div>
                <div className={styles.leftBox}>
                    <input onChange={(e)=>{handleSearch(e.target.value)}} type="text" placeholder="Search" />
                    <img src="/magnifying-glass.png" alt="" />
                    <img src="/images/bell.png" alt="" />
                    <div>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/face-1659511-1410033.png" alt="" />
                        <div>
                            <p>{user.firstName}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}