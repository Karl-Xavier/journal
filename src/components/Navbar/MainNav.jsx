import React from 'react'
import SideNav from './SideNav'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.css'
import UserDetails from '../../pages/Auth/UserDetails'

const MainNav = () => {
  return (
    <nav>
        <div className='container flexbox'>
            <div>
                <SideNav />
                <h2 style={{marginLeft: "3px", userSelect: "none"}}>Travel Jorunal</h2>
            </div>
            <div>
                <UserDetails/>
            </div>
        </div>     
    </nav>
  )
}

export default MainNav