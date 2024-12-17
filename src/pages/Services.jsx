import React from 'react';
import './services.css';
import networkImage from '../assets/images/network.jpg';
import securityimage from '../assets/images/security.jpg';
import audioimage from '../assets/images/audio.png';
import infotainmentimage from '../assets/images/infotainment.png';
import smarthomeimage from '../assets/images/smarthome.jpg';
import greensolutionsimage from '../assets/images/greensolutions.png';
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import {Link} from 'react-router-dom'

const Services = () => {
  const services = [
    {
      title: "Network and Communication",
      description: "HSIA, Network Infrastructure, Cabling solutions",
      image: networkImage, // Example image path
      link: "/services/network",
    },
    {
      title: "Audio - Visual",
      description: "Create sleek and functional mobile apps.",
      image: audioimage,
      link:"/services/Audiovisual"
    },
    {
      title: "Infotainment",
      description: "Optimize your website for search engines.",
      image: infotainmentimage,
      link:"/services/infotainment"
    },
    {
      title: "Smart Homes",
      description: "Design intuitive and user-friendly interfaces.",
      image:  smarthomeimage,
    },
    {
      title: "Green Solutions",
      description: "Implement scalable and secure cloud systems.",
      image: greensolutionsimage,
    },
    {
      title: "Security Systems",
      description: "Launch and manage online stores effectively.",
      image: securityimage,
      link:"/services/Security"
    },
  ];

  return <Helmet title="Serices">
      <CommonSection title=" Our Services"/>
    <div className="service-page">
      <h1>Our Services</h1>
      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
             <Link to={service.link} className="service-link">
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <div className="overlay">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
</Helmet>
}

export default Services;
