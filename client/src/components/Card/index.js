import React from "react";
import "./style.css";

function Card({ title, authors, link, description, image, Button }) {
    return (
        <div>
            <div className="card">
                <h4>{title}</h4>
                <p>{authors}</p>
                <a href={link} target="_blank" rel="noreferrer">
                    View
                </a>
                <br></br>
                <img alt={title} src={image} width="200" height="300"></img>
                <br></br>
                <p>{description}</p>
                <Button />
            </div>
        </div>
    );
};

export default Card;
