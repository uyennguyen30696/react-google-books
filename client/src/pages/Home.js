import React, { useState } from "react";
import "./styling/home.css";
import Jumbotron from "../components/Jumbotron";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Card from "../components/Card";
import API from "../utils/API";

function Home() {

    const [books, setBooks] = useState([]);
    const [q, setQ] = useState("");
    // const [message, setMessage] = useState("Search for books to begin!");

    const search = () => {
        API.getBooks(q)
            .then(res => {
                console.log(res.data)
                setBooks([res.data])
            })
            .catch(
                err => console.log(err),
                // setMessage("No book matches your search!"),
                setBooks([])
            );
    }

    const handleInputChange = (e) => {
        setQ(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        search();
    }

    const handleBookSave = (e) => {
        e.preventDefault();
        
        API.saveBook({
            title: "title",
            authors: "authors",
            link: "link",
            image: "image",
            description: "description"
        })
            .then(
                console.log("clicked")
            )
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
                {books.length ? (
                    <div>
                        {books.map((book, i) => (
                            <div key={i}>
                            {book.items.map((result, i) =>
                                <Card 
                                    key={i}
                                    title={result.volumeInfo.title}
                                    authors={result.volumeInfo.authors.join(", ")}
                                    link={result.volumeInfo.infoLink}
                                    description={result.volumeInfo.description}
                                    image={result.volumeInfo.imageLinks.thumbnail}
                                    Button={() => (
                                        <button
                                            onClick={handleBookSave}
                                        >
                                          Save
                                        </button>
                                      )}
                                />
                            )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3>Search for books to begin!</h3>
                )}
            </div>
        </div>
    );
};

export default Home;
