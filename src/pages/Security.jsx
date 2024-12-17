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
            <h2>AUDIO VISUAL</h2>
            <p>
              Viqtech stands out as one of Africa’s leading AV equipment and system integrators,
              offering top-notch solutions that combine premium equipment
              and expert industry knowledge to empower organizations with efficient service delivery.
            </p>
          </div>
          <div className="text-container">
            <p>
              Our cutting-edge systems feature the latest technology, ensuring clear audio and high-quality video.
              From initial design consultation through deployment and managed services, we collaborate closely with clients,
              facilitating enhanced efficiency for both individuals and businesses. Our support services extend beyond geographical boundaries,
              fostering connectivity and unity among organizations, their personnel, and partners.
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
            <h2>MEETING ROOMS</h2>
            <p>
              We facilitate interaction and collaboration in your meeting rooms by providing the ideal environment for video communications and virtual meetings.
              Our promise is to deliver an efficient experience for your users, transitioning a cramped huddle space into an advanced technological boardroom.
            </p>
            <p>
              The modern boardroom has developed dramatically with the advancement of technologies.
              The boardroom is now all about collaborating with people in different locations, and not just in the local office space.
              Viqtech facilitates interaction and collaboration in your meeting rooms by providing the ideal environment for video communications and virtual meetings.
              Our boardroom automation will allow you to have complete control of your boardroom from one central
              device including, LED screens, video walls, projectors, heating, lighting, network equipment and audio.
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
            <h2>VIDEO WALLS</h2>
            <p>
              Video walls serve as powerful visual communication platforms, and Bakyson leverages advanced technologies to create impactful and immersive displays.
              Here’s how Viqtech transforms spaces with Video Walls. Viqtech's video walls create immersive visual experiences,
              provide excellent visibility even in large spaces or areas with high ambient light, offer versatility in content
              display allowing organizations to showcase a wide range of multimedia content and provide a centrally managed and controled
              content distribution across multiple displays,
              ensuring consistent messaging and easy content updates.
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
            <h2>BGM</h2>
            <p>
              At Viqtech, our Background Music solutions are crafted to enhance the atmosphere of any space with seamless, high-quality audio.
              We offer tailored systems that cater to diverse environments, ensuring an engaging and comfortable auditory experience.
            </p>
          </div>
        </div>
      </section>

      <section className="display">
        <div className="container">
          <div className="image-container">
            <img src={displayprojector} alt="Description of image" />
          </div>
          <div className="text-container">
            <h2>DISPAY & PROJECTORS</h2>
            <p>
              At Viqtech, our Display & Projectors solutions deliver exceptional visual
              experiences for various applications. We provide advanced technology that enhances presentations, entertainment,
              and dynamic visual displays, ensuring high-quality imagery and performance.
            </p>
          </div>
        </div>
      </section>

      <section className="solutions">
        <div className="container">
          <div className="text-solutions">
            <h2>Audio Visual Solutions We Provide</h2>
            <p>
              We provide advanced AV systems for various applications, including presentations, entertainment,
              and interactive displays, ensuring high-quality audio and crisp visuals for any setting.
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