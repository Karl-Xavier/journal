import React, { useState } from 'react'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Envelope, Password } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Login.css'
import 'bootstrap/dist/css/bootstrap.css'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login(e){
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("User Successfully Logged In", {
        position: 'top-center'
      })
      window.location.href = '/'
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div className='container login-box'>
      <div className='login'>
        <h1>
          Login
        </h1>
        <form onSubmit={login}>
          <div>
            <Envelope size={20}/>
            <input
              type="email"
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Password size={20}/>
            <input
              type="password"
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-lg btn-block btn-primary'>Login</button>
        </form>
        <p style={{marginTop: "10px"}}>Don't have an account yet? <Link to={'/signup'}>SignUp</Link></p>
    </div>
    </div>
  )
}

export default Login;