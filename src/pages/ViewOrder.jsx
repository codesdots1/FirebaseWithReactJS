import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";

const ViewOrderPage = () => {

    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if(firebase.isLoggedIn){
            firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs));
        }
    }, [firebase]);

    if(!firebase.isLoggedIn){
        <h1> Please Login </h1>
    }

    console.log(books);

    return (
        <div>
            {
                books.map(book => <BookCard link={`/book/order/${book.id}`} key={book.id} id={book.id} {...book.data()} />)
            }
        </div>
    )
};

export default ViewOrderPage;