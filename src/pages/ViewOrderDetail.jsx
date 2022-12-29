import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";

const ViewOrderDetailPage = () => {

    const param = useParams();
    const firebase = useFirebase();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        firebase.getOrders(param.bookId).then((orders) => setOrders(orders.docs));
    }, [])

    return (
        <div className="conatiner mt-5">
            <h1>Orders</h1>
            {
                orders.map(order => {
                    const data = order.data();
                    return (
                        <div className="mt-5" style={{ border: "1px solid", padding: "10px" }} key={order.id}>
                            <h5>Order By: {data.displayName}</h5>
                            <h5>Quantity: {data.qty}</h5>
                            <h5>Email: {data.userEmail}</h5>
                        </div>
                    )
                })
            };
        </div>
    )
}

export default ViewOrderDetailPage;