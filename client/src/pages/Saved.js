import React from "react";
import "./styling/saved.css";
import Jumbotron from "../components/Jumbotron";
import { InputGroup, FormControl, Button } from "react-bootstrap";
// import Card from "../components/Card";

function Saved() {
    return (
        <div>
            <Jumbotron />
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search in my list..."
                        aria-label="Search in my list"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Saved;
