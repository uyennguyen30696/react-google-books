import React, { useState } from "react";
import "./styling/home.css";
import Jumbotron from "../components/Jumbotron";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Card from "../components/Card";
import API from "../utils/API";

function Home() {

    const [books, setBooks] = useState([]);
    const [q, setQ] = useState("");

    const search = () => {
        API.getBooks(q)
            .then(res => {
                console.log(res.data)
                setBooks({
                    books: res.data
                })
            })
            .catch(err => console.log(err));
    }

    const handleInputChange = (e) => {
        setQ(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        search();
    }

    return (
        <div>
            <Jumbotron />
            <div id="search">
                <InputGroup className="mb-3 here">
                    <FormControl
                        placeholder="Search books..."
                        aria-label="Search books"
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={(e) => handleFormSubmit(e)}
                        >Search
                        </Button>
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
