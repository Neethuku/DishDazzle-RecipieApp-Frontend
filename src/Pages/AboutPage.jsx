import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import chefImage from '../assets/chef1-removebg-preview_enhanced.png';
import aboutimg from '../assets/aboutimg.jpeg';

function AboutPage() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center align-items-center mb-5">
        <div className="col-12 col-md-4 text-center mb-4 mb-md-0" >
          <h4 style={{ fontWeight: 'bold', color: '#965641' }} className="mb-3">
            About Us
          </h4>
          <p style={{ textAlign: 'center' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius enim, vero non molestias nulla eveniet dolorum. 
            Voluptatem unde commodi, mollitia facere et consectetur, ipsam, dicta cumque fuga soluta provident repellat.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius enim, vero non molestias nulla eveniet dolorum. 
            Voluptatem unde commodi, mollitia facere et consectetur, ipsam, dicta cumque fuga soluta provident repellat.
          </p>
        </div>
        <div className="col-12 col-md-5 text-center">
          <img 
            src={chefImage}
            alt="Dish Delight Chef"
            className="img-fluid rounded"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      </div>
      
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-4 order-md-2 text-center mb-4 mb-md-0">
          <h4 style={{ fontWeight: 'bold', color: '#965641' }} className="mb-3">
             Dish Dazzle
          </h4>
          <p style={{ textAlign: 'center' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius enim, vero non molestias nulla eveniet dolorum. 
            Voluptatem unde commodi, mollitia facere et consectetur, ipsam, dicta cumque fuga soluta provident repellat.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius enim, vero non molestias nulla eveniet dolorum. 
            Voluptatem unde commodi, mollitia facere et consectetur, ipsam, dicta cumque fuga soluta provident repellat.
          </p>
        </div>
        <div className="col-12 col-md-5 text-center">
          <img 
            src={aboutimg}
            alt="About Dish Delight"
            className="img-fluid rounded"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
