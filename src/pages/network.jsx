import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import './network.css'
import ip from "../assets/images/ip.png"
import heis from "../assets/images/heis.png"
import structured from "../assets/images/structured-cable.png"


const network = () => {
  return <Helmet title = "Network and communication">
    <CommonSection title="Network and communication"/>

 <div class="section">
  <h2>NETWORKS & COMMUNICATIONS</h2>
  <p>At ViqTech, we understand the critical role that robust and efficient Networks and Communication systems play in today’s dynamic business environment. Our commitment to providing exceptional ICT solutions extends to a comprehensive suite of services under Networks and Communication, ensuring seamless connectivity and communication across various industries.</p>
 </div>
 <div class="hsia">
    <img src={heis} alt="HSIA Image" />
    <div class="text-container">
        <h3>HSIA</h3>
        <p>ViqTech takes pride in delivering enterprise-grade HSIA solutions tailored to meet the unique connectivity needs of 
            businesses across various industries. While hospitality HSIA is our dearest charm, our comprehensive HSIA offerings 
            are designed to empower enterprises from all industries with the speed, reliability, and scalability required to 
            stay ahead in today’s competitive market.</p>
    </div>
</div>

<div class="structured">
    <div class="text-container">
        <h3>STRUCTURED CABLING</h3>
        <p>Structured cabling is all about having and implementing a standardized system of cabling and labelling of 
            connectivity products used within your network. Simple as it may sound, structured cabling is essential and 
            provides a comprehensive and organized framework for establishing a network infrastructure that facilitates 
            efficient communication and data sharing among devices and users.</p>
    </div>
    <img src={structured} alt="Structured Cabling" />
</div>

 
<div class="ip-telephony">
    <img src={ip} alt="IP Telephony" />
    <div class="text-container">
        <h3>IP TELEPHONY</h3>
        <p>IP Telephony, or Voice over Internet Protocol (VoIP), allows voice communication over 
            the internet rather than traditional telephone lines. 
            It offers cost-effective, scalable, and feature-rich communication for businesses.</p>
        <p>Viqtech is the leading provider of advanced IP Telephony solutions by offering the following services:</p>
        <ul>
            <li>Hosted PBX (Private Branch Exchange)</li>
            <li>VoIP Phone Systems</li>
            <li>SIP Trunking</li>
            <li>Call Center Solutions</li>
            <li>IP Telephony Hardware and Software</li>
            <li>Customized IP Telephony Systems</li>
        </ul>
    </div>
</div>


  </Helmet>
}

export default network