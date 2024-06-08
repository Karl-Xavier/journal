import React from 'react'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.css'
import TravelLog from '../../components/TravelLog/TravelLog'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'
import MainNav from '../../components/Navbar/MainNav'

const Home = () => {
  return (
    <div>
      <MainNav/>
    <div className='container' style={{width: "100%",height: "90vh", padding: "4%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="container travellog-container rounded">
          <TravelLog/>
          <Link to={'/travelLogForm'} className='buttonn'>
            <PlusCircle size={50} className='but'/>
          </Link>
        </div>
    </div>
    </div>
  )
}

export default Home