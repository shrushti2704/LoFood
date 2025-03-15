import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-item active">
            <img src='/pizza.jpg' className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pizza" />
            <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ height: "100%", top: 0 }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "700px" }} value={search} onChange={(e) => { setSearch(e.target.value) }} />
              </div>
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

      <div className='container'>
        {foodCat.length > 0
          ? foodCat.map((data, index) => (
            <div key={index} className='row mb-3'>
              <div className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />
              {foodItem.length > 0
                ? foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filterItems, idx) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
                : <div>No Such Data Found</div>
              }
            </div>
          ))
          : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}


