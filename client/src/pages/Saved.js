import React, { useEffect, useState } from "react";
import "./styling/saved.css";
import Jumbotron from "../components/Jumbotron";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Card from "../components/Card";
import API from "../utils/API";

function Saved() {

    const [books, setBooks] = useState({});
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("You have no saved book yet!");

    useEffect(() => {
        loadSavedBooks();
    }, []);

    const loadSavedBooks = () => {
        API.getSavedBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(
                err => console.log(err)
            );
    }

    const handleBookDelete = (id) => {
        API.deleteBook(id)
            .then(res =>
                loadSavedBooks(res.data)
            )
            .catch(err => console.log(err));
    }

    const handleSearchInput = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleSearchTitle = (e) => {
        e.preventDefault();

        if (title) {
            API.getOneSavedBook({
                title
            })
                .then(res => {
                    setBooks(res.data);

                    if (title !== res.data.title) {
                        setMessage("There is no book matches your search!");
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <Jumbotron />
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search in my list..."
                        aria-label="Search in my list"
                        aria-describedby="basic-addon2"
                        onChange={(e) => { handleSearchInput(e) }}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={handleSearchTitle}
                        >
                            Search
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div>
                {books.length ? (
                    <div>
                        {books.map(result => (
                            <Card
                                key={result._id}
                                title={result.title}
                                authors={result.authors.join(", ")}
                                link={result.infoLink}
                                image={result.image}
                                description={result.description}
                                Button={() => (
                                    <button
                                        onClick={() => handleBookDelete(result._id)}
                                    >
                                        Delete
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

export default Saved;
