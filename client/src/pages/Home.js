import React from "react";
import "./styling/home.css";
import Jumbotron from "../components/Jumbotron";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Card from "../components/Card";

function Home() {
    return (
        <div>
            <Jumbotron />
            <div id="search">
                <InputGroup className="mb-3 here">
                    <FormControl
                        placeholder="Search books..."
                        aria-label="Search books"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div>
                <Card>
                    <button>Save</button>
                </Card>
            </div>
        </div>
    );
};

export default Home;
