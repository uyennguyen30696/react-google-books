import React from "react";
import "./style.css";

function Card({children}) {
    return (
        <div>
            <div className="card">
                <h4>Title</h4>
                <p>Book</p>
                {children}
            </div>
        </div>
    );
};

export default Card;
