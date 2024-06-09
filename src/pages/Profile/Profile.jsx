import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { getDoc, doc, updateDoc } from '@firebase/firestore'
import 'bootstrap/dist/css/bootstrap.css'
import './Profile.css'
import { Pencil } from 'phosphor-react'
import { toast } from 'react-toastify'
import { Logout, Update } from '@mui/icons-material'
import MainNav from '../../components/Navbar/MainNav'

const Profile = () => {
    const [userProfile, setUserProfile] = useState({})
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const onEdit = () => {
        setEdit(!edit)
    }

    const fetchUserProfile = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const getProfile = doc(db, "Users", user.uid)
                    const getProfileLink = await getDoc(getProfile)

                    if (getProfileLink.exists()) {
                        const data = getProfileLink.data()
                        setUserProfile({ ...data, id: user.uid })  // Set the user ID
                        setName(data.name)
                        setEmail(data.email)
                    } else {
                        console.log("User document does not exist")
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error)
                }
            } else {
                console.log("User is not logged in")
            }
        })
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const updateDocument = async () => {
        if (!userProfile || !userProfile.id) {
            console.error('User profile is null or missing ID')
            return
        }

        try {
            const documentToUpdate = doc(db, 'Users', userProfile.id)
            await updateDoc(documentToUpdate, {
                name: name,
                email: email,
            })
            console.log('Document updated successfully:', documentToUpdate.id)
            toast.success('Update Successful!', { position: 'top-center' })

            setUserProfile((prevProfile) => ({
                ...prevProfile,
                name: name,
                email: email,
            }))
            setEdit(false)
            window.location.href = '/profile'
        } catch (error) {
            console.error('Error updating document:', error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div>
            <MainNav />
            <div className="container profile-con py-4">
                    {userProfile.name ? (
                        <section className='content'>
                            <div className="first">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                readOnly={!edit}
                                className='name'
                                style={{
                                    border: edit ? '1px solid black' : 'none',
                                    outline: "none",
                                    padding: "3%",
                                    borderRadius: "5px",
                                    display: 'block',
                                    backgroundColor: 'transparent',
                                    fontSize: "30px",
                                    textAlign: "center",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "180px"
                                }}
                            />
                            <Pencil
                                size={20}
                                onClick={onEdit}
                                title="Edit"
                                className='pencil'
                            />
                            </div>
                            <p>{email}</p>
                            <div>
                                <button className='btn btn-primary profileButton mt-3'>SignOut <Logout /> </button>
                            </div>
                        </section>
                    ) : <p>Loading.....</p>
                    }
                    <p style={{ fontWeight: "bold" }} className='my-3'>Your Profile Informations</p>
                {edit && userProfile && (
                    <button style={{ width: "150px" }} className='btn btn-primary mt-3' onClick={updateDocument}>Update <Update /> </button>
                )}
            </div>
        </div>
    )
}

export default Profile
