import React, { useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from '@firebase/firestore'
import { toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css'
import './SignUp.css'
import { Envelope, Password, User } from 'phosphor-react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordPattern = /^(?!.*(12345678|password|qwerty|letmein|123123)).{8,}$/

    const isEmailValid = (email) => emailPattern.test(email)
    const isPasswordValid = (password) => passwordPattern.test(password)

    async function signUp(e) {
        e.preventDefault()
        if (!isEmailValid(email)) {
            toast.error("Please enter a valid email address", { position: "top-center" })
            return
        }
        if (!isPasswordValid(password)) {
            toast.error("Please enter a stronger password", { position: "top-center" })
            return
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    name: userName,
                    email: user.email
                })
            }
            toast.success("Registration Successful", { position: "top-center" })
            setEmail('')
            setPassword('')
            setUserName('')
            window.location.href = '/login'
        } catch (error) {
            toast.error(error.message, { position: "top-center" })
        }
    }

    return (
        <div className='signup-con container'>
            <div className="signup">
                <h1>Sign Up</h1>
                <form onSubmit={signUp}>
                    <div>
                        <User size={20} />
                        <input
                            type="text"
                            name='userName'
                            placeholder='UserName'
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Envelope size={20} />
                        <input
                            type="email"
                            name='email'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Password size={20} />
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-lg btn-primary btn-block my-3'>Signup</button>
                </form>
                <p>Already have an account? <Link to={'/login'}>Login Here</Link></p>
            </div>
        </div>
    )
}

export default SignUp
