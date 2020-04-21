import React, { Component } from 'react';
import './PortfolioItem.css';


function PortfolioItem({ work }) {
    return (
        <a href={'/project/' + work.id} className='portfolio-item'>
            <div className="card">
                <img className="card-img" src={work.image_url} alt={work.title} onError={(e) => {e.target.onerror = null; e.target.src="./logo192.png"}}/>
                <div className="card-body">
                    <h5 className="card-title center">{work.title}</h5>
                </div>
            </div>
        </a>
    );
}

export default PortfolioItem;