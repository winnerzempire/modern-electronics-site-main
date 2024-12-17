import React from 'react'
import './infotainment.css'
import digital from "../assets/images/digital.png"
import interactive from "../assets/images/Interactive.png"

const infotainment = () => {
  return (
    <div className="three-part-layout">
   
   <section className="info">
  <div className="content">
    <div className="info-wrapper">
      <div className="heading-container">
        <h2>INFOTAINMENT</h2>

        <h3>Engage, Inform, Transform</h3>
      </div>
      <div className="text-container">
        <p className="right-text">
          Empower your audience and achieve your goals with our comprehensive infotainment solutions. 
          From captivating digital signage to intuitive IPTV systems, we create a more immersive experience.
        </p>
        <p>
          Our solutions deliver Increased Engagement & Interaction, Dynamic & Real-time Communication, 
          Streamlined Operations & Reduced Costs, Personalized Experiences & Measurable Results.
        </p>
      </div>
    </div>
  </div>
</section>


    
    <section className="iptv">
    <img src={ interactive} alt="Placeholder" className="image" />
      <div className="content">
        <h2>INTERACTIVE IPTV</h2>
        <h3>Captivate Guests and Elevate Your Hospitality Experience with Next-Generation IPTV</h3>
        <p className="right-text">In today’s competitive hospitality landscape, exceeding guest expectations is crucial 
            for building loyalty and securing positive word-of-mouth. 
            Our cutting-edge IPTV solution empowers you to deliver an unparalleled guest experience, 
            fostering deeper connections and creating lasting memories.</p>
      </div>
    </section>

    
    <section className="digital">
      <div className="content">
        <h2>DIGITAL SIGNAGE</h2>
        <h3>Capture Attention. Deliver Impact.</h3>
        <p>Elevate your communication strategy with captivating digital signage solutions. 
            From vibrant LED displays to interactive kiosks, we offer 
            a comprehensive range of solutions to engage your audience, 
            amplify your message, and achieve your objectives. </p>
      </div>
    <img src={digital} alt="Placeholder" className="image" />
    </section>
  </div>
  )
}

export default infotainment