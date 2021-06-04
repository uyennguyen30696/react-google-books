import React from "react";
import "./style.css";

function Card({ title, authors, link, description, image }) {
    return (
        <div>
            <div className="card">
                <h4>{title}</h4>
                <p>{authors}</p>
                <a href={link} target="_blank" rel="noreferrer">
                    View
                </a>
                <p>{description}</p>
                <img alt={title} src={image} width="100"></img>
            </div>
        </div>
    );
};

export default Card;
