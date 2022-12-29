import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/Firebase";

const ListingPage = () => {

    const firebase = useFirebase();

    const [bookName, setBookName] = useState("");
    const [bookIsbnNumber, setBookIsbnNumber] = useState("");
    const [bookImage, setBookImage] = useState("");
    const [bookPrice, setBookPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.handleCreateNewListing(bookName, bookIsbnNumber, bookImage, bookPrice);
    }

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter ISBN Number" value={bookIsbnNumber} onChange={(e) => setBookIsbnNumber(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Book Cover Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setBookImage(e.target.files[0])} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    )
}


export default ListingPage;