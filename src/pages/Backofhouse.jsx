import React from 'react'
import "./Security.css"
import printers from '../assets/images/printers.png'
import laptops from '../assets/images/laptops.png'
import servers from '../assets/images/servers.png'
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
            <h2>BACK OF HOUSE </h2>
            <p>Embrace Efficiency, Elevate Experiences: The Power of Automation Solutions</p>
          </div>
          <div className="text-container">
            <p>Empower Your Digital Landscape: The Backbone of Modern IT Infrastructure</p>
            <p>
            In an increasingly connected world, having the right hardware is crucial for driving productivity, 
            ensuring security, and maintaining seamless operations. 
            Our diverse range of hardware solutions, including servers, laptops & computers, and printers, 
            provides the reliable foundation you need to excel in today’s fast-paced digital environment.
            </p>
          </div>
        </div>
      </section>

      <section className="image-text-section">
        <div className="container">
          <div className="image-container">
            <img src={servers} alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>SERVERS</h2>
            <p>
            Harness the power of our robust server solutions designed to meet the demands of modern businesses. From small enterprises to large corporations,
             our servers provide the scalability, security, and performance necessary to support your critical applications and data.
            </p>
          </div>
        </div>
      </section>

      <section className="videowalls">
        <div className="container">
          <div className="image-container">
            <img src={ laptops } alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>LAPTOPS AND COMPUTERS</h2>
            <p>
            At Viqtech we Equip your workforce with powerful and efficient laptops and computers. Whether for everyday tasks, creative projects, or 
            intensive computing, our range of devices ensures that your team has the right tools to succeed, wherever they are.
            </p>
          </div>
        </div>
      </section>

      <section className="bgm">
        <div className="container">
          <div className="image-container">
            <img src={printers } alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>PRINTERS</h2>
            <p>
            Experience reliability and efficiency with our state-of-the-art printers. From high-speed document printing to specialized graphic outputs, 
            our printers cater to all your needs, enhancing productivity in both office and remote work settings.
            </p>
          </div>
        </div>
      </section>

      

      <section className="solutions">
        <div className="container">
          <div className="text-solutions">
            <h2>Back Of House Solutions We Provide</h2>
            <p>
            eliver reliable and secure high-performance applications and accelerate compute-intensive workloads inside traditional data centers or in extreme conditions at the edge.
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