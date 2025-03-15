import React from 'react';

export default function Carousal() {
  return (
    <div>
      <div 
        id="carouselExampleFade" 
        className="carousel slide carousel-fade" 
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id='carousel'>

          <div className="carousel-item active">
            <img src='/pizza.jpg' className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pizza" />
            <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ height: "100%", top: 0 }}>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "700px" }}  />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/burger.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
          </div>
          
          <div className="carousel-item">
            <img src="/momos.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Momos" />
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

