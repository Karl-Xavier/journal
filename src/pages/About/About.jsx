import React from 'react'
import MainNav from '../../components/Navbar/MainNav'
import 'bootstrap/dist/css/bootstrap.css'

const About = () => {
  const fullYear = new Date().getFullYear()
  return (
    <div>
        <MainNav/>
        <div className="container">
          <h2>About</h2>
          <section className="container">
            <p>Travel Jorunal is a virtual diary made for you to be able to store all your travel experience and all the fun stuff that happened during your trip. It also allows you to share your experience with others on other platform like Facebook, Whatsapp and Twitter, making others know the fun stuff you enjoyed. As more user start using <b>Travel Journal</b> we will update it with what you want and make it more fun to use.</p> 
          </section>
          <div className="container text-center">
            <p>&copy; Copyright Emeka Bruno</p>
            <p style={{fontStyle: "italic", color: "grey"}}>Travel Journal {fullYear}</p>
          </div>
        </div>
    </div>
  )
}

export default About