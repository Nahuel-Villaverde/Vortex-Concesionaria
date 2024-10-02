import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Elevate Your Travel Experience</h1>
      <div className="image-grid">
        <div className="small-images">
          <div className="image-container">
            <img src="images/bmwImage.png" alt="BMW" />
            <p className="image-text">BMW</p>
          </div>
          <div className="image-container">
            <img src="images/audiImage.png" alt="Audi" />
            <p className="image-text">Audi</p>
          </div>
        </div>
        <div className="large-image image-container">
          <img src="images/mercedezImage.png" alt="Mercedez-Benz" />
          <p className="image-text">Mercedez-Benz</p>
        </div>
      </div>
      <div className="catalog">
        <h3>In search of perfection</h3>
        <p>Discover the experience of driving a high-end car. Designed with cutting-edge technology, unparalleled comfort, and performance that exceeds all expectations. Choosing a luxury car means opting for safety, prestige, and the pleasure of driving the best.</p>
        <button className="catalog-button">Catalog</button>
      </div>
      <div className="our-vehicles">
        <div className='our-vehicles-text'>
          <h2>Our vehicles</h2>
          <p>Power, elegance and technology in every detail.</p>
        </div>

        <div className='car-card-container'>
          <div className='cars'>
            <img src="images/serie2.png" alt="BMW serie 2 220i" />
            <div className='card-description'>
              <h5>Serie 2 220I</h5>
              <span>BMW</span>
              <div className='price-buy'>
                <span>$35.000</span>
                <button>Buy now</button>
              </div>
            </div>
          </div>

          <div className='cars'>
            <img src="images/A5 Coupe.png" alt="A5 Coupe" />
            <div className='card-description'>
              <h5>A5 Coupe</h5>
              <span>Audi</span>
              <div className='price-buy'>
                <span>$45.000</span>
                <button>Buy now</button>
              </div>
            </div>
          </div>

          <div className='cars'>
            <img src="images/model s.png" alt="Model S" />
            <div className='card-description'>
              <h5>Model S</h5>
              <span>Tesla</span>
              <div className='price-buy'>
                <span>$90.000</span>
                <button>Buy now</button>
              </div>
            </div>
          </div>

          <div className='cars'>
            <img src="images/E class.png" alt="E-Class Coupe" />
            <div className='card-description'>
              <h5>E-Class Coupe</h5>
              <span>Mercedes-Benz</span>
              <div className='price-buy'>
                <span>$60.000</span>
                <button>Buy now</button>
              </div>
            </div>
          </div>
        </div>

        <button className='see-all'>See all Cars</button>
      </div>

      <div className='about-us'>
        <div className='about-topside'>
          <div className='about-us-text'>
            <h2>About Us</h2>
            <p>At Vortex, we are dedicated to offering cars of the highest quality with a focus on excellence and customer satisfaction. Since our inception, we have worked with passion and commitment to provide innovative and reliable solutions. Our team of experts is here to ensure that every experience with us exceeds your expectations. Discover how our dedication to quality and attention to detail can make a difference.</p>
          </div>
          <div className='about-us-numbers'>

            <div className='years-experience'>
              <span className='numbers-verify'>12</span>
              <span className='plus'>+</span>
              <p className='description-numbers'>Years of exprience</p>
            </div>

            <div className='vehicles-sold'>
              <span className='numbers-verify'>15k</span>
              <span className='plus'>+</span>
              <p className='description-numbers'>Vehicles sold</p>
            </div>
          </div>
        </div>
        <div className='medals'>
          <div className='mini-medal'>
            <img src="images/maxQual.png" alt="Audi" />
            <h5>Maximum Quality</h5>
            <p>We guarantee the highest standards in each vehicle, using cutting-edge materials and technology.</p>
          </div>
          <div className='mini-medal'>
            <img src="images/attention.png" alt="Audi" />
            <h5>Personalized Attention</h5>
            <p>Our team is dedicated to offering you a service tailored to your needs, ensuring that each client receives the best care.</p>
          </div>
          <div className='mini-medal'>
            <img src="images/innovation.png" alt="Audi" />
            <h5>Constant Innovation</h5>
            <p>We are at the forefront of the sector, incorporating the latest innovations and technologies in our vehicles to offer you the best.</p>
          </div>
        </div>
      </div>

      <div className='testimonials'>
        <div className='title-testimonials'>
          <h6>What Our Clients Say</h6>
          <h2>Testimonials</h2>
          <p>Our customers' satisfaction is our greatest reward. Find out what those who have already experienced Vortex's quality, service and excellence are saying.</p>
        </div>

        <div className='testimony-container'>
          <div className='testimony'>
            <p>“From the first contact, the Vortex team provided me with impeccable service. I purchased my car with complete confidence and I couldn't be more satisfied with the quality and performance. Without a doubt, a first-class experience.”</p>
            <div className='person'>
              <div className='person-left-part'>
                <img src="images/Ellipse 3.png" alt="Audi" />
                <h4>James Mitchell</h4>
              </div>
              <img src="images/cotizacion 1.png" alt="Audi" />
            </div>
          </div>
          <div className='testimony'>
            <p>"Vortex exceeded all my expectations. The personalized attention and variety of high-end cars made me feel confident in my choice. I recommend this dealership to anyone looking for the best."</p>
            <div className='person'>
              <div className='person-left-part'>
                <img src="images/Ellipse 4.png" alt="Audi" />
                <h4>Sarah Thompson</h4>
              </div>

              <img src="images/cotizacion 1.png" alt="Audi" />
            </div>
          </div>
        </div>
      </div>

      <footer>

        <div className='info'>
          <div className='vortex-container'>
            <img src="images/VortexLogo.png" alt="Logo" />
            <h3>Vortex</h3>
          </div>
          <p>At Vortex, we specialize in offering high-end vehicles, combining cutting-edge technology, exceptional performance, and unmatched customer service to provide you with a unique buying experience.</p>
          <div className='redes'>
            <div className='red'>
              <img src="images/telefono.png" alt="Telefono" />
              <span>(123) 456-7890</span>
            </div>
            <div className='red'>
              <img src="images/carta.png" alt="Carta" />
              <span>Vortexoficial@gmail.com</span>
            </div>
            <div className='red'>
              <img src="images/ig.png" alt="Instagram" />
              <span>VortexOficial</span>
            </div>
            <div className='red'>
              <img src="images/ubicacion.png" alt="Ubicacion" />
              <span>1234 Sunset Boulevard, Los Angeles, USA</span>
            </div>
          </div>
        </div>

        <div className='hours'>
          <h3>Working Hours</h3>
          <div className='days'>
            <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
            <span>Saturday: 10:00 AM - 4:00 PM</span>
            <span>Sunday: Closed</span>
          </div>
        </div>
        <div className='newsletter'>
          <div className='newsletter-title'>
            <h3>Newsletter Subscription</h3>
            <p>Stay updated with the latest news, exclusive offers, and special promotions from Vortex. Subscribe to our newsletter and be the first to know about new arrivals and exciting updates!</p>
          </div>

          <div className='newsletter-form'>
            <input
              type='email'
              placeholder='Enter your email'
              className='newsletter-input'
            />
            <button type='submit' className='newsletter-btn'>
              Submit
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Home;
