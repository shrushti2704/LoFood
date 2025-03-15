import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from '../trash.svg';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    // If Cart is Empty
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    // Checkout Function
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            let response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

            console.log("Order Response Status:", response.status);
            let result = await response.json();
            console.log("Order Response Data:", result);

            if (response.ok && result.success) {
                dispatch({ type: "DROP" });
                alert("Checkout Successful!");
            } else {
                alert("Checkout Failed. Please try again.");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Checkout Error. See console for details.");
        }
    }

    // Calculate Total Price
    let totalPrice = data.reduce((total, food) => total + (food.price * food.qty), 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price * food.qty}</td>
                                <td>
                                    <button type="button" className='btn p-0' onClick={() => dispatch({ type: "REMOVE", index: index })}>
                                        <img src={trash} alt="Delete item from cart" style={{ width: "25px", height: "25px" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='fs-3'>Total Price: ₹{totalPrice}/-</div>
                <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
            </div>
        </div>
    );
}
