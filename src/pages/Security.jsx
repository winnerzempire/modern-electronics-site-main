import React from 'react'
import "./Security.css"
import videowalls from '../assets/images/videowalls.png'
import meetingrooms from '../assets/images/meetingrooms.png'
import displayprojector from '../assets/images/displayprojector.webp'
import samsung from '../assets/images/samsung-logo.png'
import shure from '../assets/images/shure.png'
import logitech from '../assets/images/logitech.png'


const Audiovisual = () => {
  return (

    <div>
      <div className="hero-section">
        <div className="hero-content">
        </div>
      </div>
      <section className="image-text-section">
        <div className="container">
          <div className="image-container">
            <h2>SECURIRY $ SAFETY</h2>
          </div>
          <div className="text-container">
            <p>
            In today’s dynamic and interconnected world, ensuring security and safety within various environments is paramount. 
            Viqtech specializes in providing cutting-edge ICT solutions tailored to meet the diverse security and safety needs of its clients. 
            These range from delivering comprehensive solutions in Access Control, Fire Evacuation to Video Surveillance.
            </p>
          </div>
        </div>
      </section>

      <section className="image-text-section">
        <div className="container">
          <div className="image-container">
            <img src={meetingrooms} alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>ACCESS CONTROL</h2>
            <p>
            We offer advanced access control systems designed to regulate and monitor entry to physical spaces with utmost precision and efficiency.
            </p>
            <p>
            In its simplest form, access control involves identifying a user based on their credentials and then authorizing 
            the appropriate level of access once they are authenticated. Passwords, pins, 
            security tokens and even biometric scans are all credentials commonly used to identify and authenticate a user
            </p>
          </div>
        </div>
      </section>

      <section className="videowalls">
        <div className="container">
          <div className="image-container">
            <img src={videowalls} alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>FIRE EVACUATION</h2>
            <p>
             We deliver comprehensive fire evacuation systems that ensure prompt and orderly evacuation procedures during emergencies. 
             We provide top-of-the-line fire alarm solutions that ensure the safety and protection of lives and property.
            </p>
            <p>
            Our advanced fire alarm systems are designed to detect fires at their earliest stages, providing early warning and enabling swift response and evacuation. 
            Our advanced voice evacuation solutions are designed to guide occupants to safety with clear and intelligible voice instructions
            </p>
          </div>
        </div>
      </section>

      <section className="bgm">
        <div className="container">
          <div className="image-container">
            <img src={meetingrooms} alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>VIDEO SURVEILLANCE</h2>
            <p>
            While utilizing cutting-edge ICT solutions to monitor and safeguard premises effectively, 
            Viqtech’s advanced video surveillance systems offer a powerful layer of protection, 
            providing you with real- time monitoring, recording, and peace of mind.   
            </p>
          </div>
        </div>
      </section>

      

      <section className="solutions">
        <div className="container">
          <div className="text-solutions">
            <h2>Access Control Solutions We Provide</h2>
            <p>
            Our solutions are designed to enhance security, streamline emergency responses, and maintain a secure environment.
            </p>
          </div>
          <div className='image'>
            <img src={samsung} alt="" />
            <img src={logitech} alt="" />
            <img src={shure} alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </section>
    </div>


  )
}

export default Audiovisual