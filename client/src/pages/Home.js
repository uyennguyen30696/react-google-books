import React, { useState } from "react";
import "./styling/home.css";
import Jumbotron from "../components/Jumbotron";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Card from "../components/Card";
import API from "../utils/API";

function Home() {

    const [books, setBooks] = useState({});
    const [q, setQ] = useState("");
    const [message, setMessage] = useState("Search for books to begin!");

    const search = () => {
        API.getBooks(q)
            .then(res => {
                console.log(res.data)
                setBooks(res.data)
            })
            .catch(
                err => console.log(err),
                setMessage("No book matches your search!"),
                setBooks({})
            );
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setQ(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        search();

        if (books === "") {
            setMessage("No book matches your search!")
        };
    }

    const handleBookSave = (id) => {
        const book = books.find(book => (
            book.id === id
        ));

        API.saveBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            link: book.volumeInfo.infoLink,
            image: book.volumeInfo.imageLinks.thumbnail,
            description: book.volumeInfo.description
        })
            .then(
                search()
            )
            .catch(err => console.log(err))
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
                        {books.map(result => (
                            <Card
                                key={result.id}
                                title={result.volumeInfo.title}
                                authors={result.volumeInfo.authors.join(", ")}
                                link={result.volumeInfo.infoLink}
                                description={result.volumeInfo.description}
                                image={result.volumeInfo.imageLinks.thumbnail}
                                Button={() => (
                                    <button
                                        onClick={() => handleBookSave(result.id)}
                                    >
                                        Save
                                    </button>
                                )}
                            />
                        ))}
                    </div>
                ) : (
                    <h3>
                        {message}
                    </h3>
                )}
            </div>
        </div>
    );
};

export default Home;
