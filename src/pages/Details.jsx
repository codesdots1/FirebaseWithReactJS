import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookDetailsPage = () => {

    const firebase = useFirebase();
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    const [qty, setQty] = useState(1);

    const params = useParams();
    console.log(params);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, []);

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data]);

    const placeOrder = async () =>{
        const result = await firebase.placeOrder(params.bookId, qty);
        console.log("Order Placed-",result);
    }

    if (data == null) {
        return <h1> Loading....! </h1>
    }

    return (
        <div className="container mt-5">
            <h1>{data.bookName}</h1>
            <img src={url} style={{ borderRadius: "15px" }} width="50%" />
            <h2>Details</h2>
            <p>ISBN: {data.bookIsbnNumber}</p>
            <p>Price: {data.bookPrice}</p>
            <h3>Owner Details</h3>
            <p> Name:  {data.displayName}</p>
            <p> Email: {data.userEmail}</p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Qty</Form.Label>
                <Form.Control type="text" placeholder="Enter Qty" value={qty} onChange={(e) => setQty(e.target.value)} />
            </Form.Group>
            <Button variant="warning" onClick={placeOrder}> Buy Now </Button>
        </div>
    )
}

export default BookDetailsPage;