import React, { useEffect, useState } from 'react'
import { db, auth } from '../../firebaseConfig'
import { getDoc, doc } from '@firebase/firestore'
import { toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css'
import './user.css'
import { Link } from 'react-router-dom'

const UserDetails = () => {

    const [userDetails, setuserDetails] = useState(null)

    useEffect(() =>{
        fetchData()
    }, [])

    const handleLogOut = async() => {
        try {
            await auth.signOut()
            toast.success("User Successfully Logged Out", {
                position: 'top-center'
              })
            window.location.href = '/login'
        } catch (error) {
            console.log("Error logging out: ",error.message)
        }
    }

    async function fetchData(){
        auth.onAuthStateChanged(
            async (user) => {
                if (user) {
                    const docRef = doc(db, "Users", user.uid)
                    const docList = await getDoc(docRef)
                    if(docList.exists()){
                      setuserDetails(docList.data())
                    } else {
                      alert("User is not Logged In")
                    }
                }
            })       
    }

return (
    <div className="userDetails">
    {userDetails ? (
        <div>
            <Link style={{textDecoration: "none", color: "#fff"}} to={'/profile'}>
                <p style={{fontWeight: "bold"}}>{userDetails.name}</p>
             </Link>
            <button className='btn btn-light button' style={{width: "100px"}} onClick={handleLogOut}>SignOut</button>
        </div>
    ) :<p style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "0",
        justifyContent: "center"}}>Loading.....</p>}
    </div>
)
}

export default UserDetails