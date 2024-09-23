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
    </div>
  );
};

export default Home;
