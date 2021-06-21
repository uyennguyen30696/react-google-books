import React, { useEffect, useState } from "react";
import "./styling/saved.css";
import Jumbotron from "../components/Jumbotron";
import { InputGroup, FormControl, Button, Dropdown, ButtonGroup } from "react-bootstrap";
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

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            handleSearchTitle(e);
        };
    }

    const sortByTitle = (e) => {
        e.preventDefault();

        API.getSavedBooks()
            .then(res =>
                setBooks(res.data.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                }))
            )
            .catch(
                err => console.log(err)
            );
    }

    const sortByAuthor = (e) => {
        e.preventDefault();

        API.getSavedBooks()
            .then(res =>
                setBooks(res.data.sort((a, b) => {
                    if (a.authors < b.authors) {
                        return -1;
                    }
                    if (a.authors > b.authors) {
                        return 1;
                    }
                    return 0;
                }))
            )
            .catch(
                err => console.log(err)
            );
    }

    return (
        <div>
            <Jumbotron />
            <div className="search">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search in my list..."
                        aria-label="Search in my list"
                        aria-describedby="basic-addon2"
                        onChange={(e) => { handleSearchInput(e) }}
                        onKeyDown={(e) => { handleEnterKey(e) }}
                    />
                    <InputGroup.Append>
                        <Button
                            className="search-btn"
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
                        <div id="dropdown-btn">
                            <Dropdown as={ButtonGroup}>
                                <Button variant="success">Sort By</Button>

                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button
                                            className="sort-btn"
                                            onClick={(e) => sortByTitle(e)}
                                        >
                                            Title
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <Button
                                            className="sort-btn"
                                            onClick={(e) => sortByAuthor(e)}
                                        >
                                            Author
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="book-container">
                            {books.map(result => (
                                <Card
                                    key={result._id}
                                    title={result.title}
                                    authors={result.authors.join(", ")}
                                    link={result.link}
                                    image={result.image}
                                    description={result.description}
                                    Button={() => (
                                        <button
                                            className="btn delete-btn"
                                            type="button"
                                            onClick={() => handleBookDelete(result._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <h2 id="saved-message">
                        {message}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default Saved;
