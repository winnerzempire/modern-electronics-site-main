import React from 'react'
import "./Security.css"
import homeAutomationmain from '../assets/images/homeAutomationmain.png'
import GuestRoom from '../assets/images/Guest-Room.jpg'
import solutionmanagement from '../assets/images/solution-managment.png'
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
            <h2>GREEN SOLUTIONS </h2>
            <p>Embrace Efficiency, Elevate Experiences: The Power of Automation Solutions</p>
          </div>
          <div className="text-container">
            <p>
            In today’s dynamic world, maximizing efficiency and creating impactful experiences are fundamental to success. 
            Our comprehensive automation solutions empower you to achieve just that, 
            offering a robust suite of tools to take control, optimize operations, 
            and unlock a world of possibilities across various industries and settings.
            </p>
          </div>
        </div>
      </section>

      <section className="image-text-section">
        <div className="container">
          <div className="image-container">
            <img src={solutionmanagement} alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>BUILDING MANAGEMENT SYSTEMS (BMS) </h2>
            <p>
            Take complete control of your building’s environment, optimize energy consumption, and ensure occupant comfort.
            </p>
          </div>
        </div>
      </section>

      <section className="videowalls">
        <div className="container">
          <div className="image-container">
            <img src={ GuestRoom } alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>GUEST ROOM MANAGEMENT SYSTEMS (GRMS)</h2>
            <p>
            Elevate guest experiences in hospitality settings, personalize comfort, and streamline operations.
            And more: We offer additional solutions tailored to specific industries and applications.
            </p>
          </div>
        </div>
      </section>

      <section className="bgm">
        <div className="container">
          <div className="image-container">
            <img src={homeAutomationmain } alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>HOME AUTOMATION</h2>
            <p>Experience the future of living and working</p>
            <p>
            At Viqtech we take complete control of your building’s environment, optimize energy consumption, and ensure occupant comfort.
            </p>
          </div>
        </div>
      </section>

      

      <section className="solutions">
        <div className="container">
          <div className="text-solutions">
            <h2>Green Solutions We Provide</h2>
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