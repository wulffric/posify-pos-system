import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import API_BASE_URL from '../config/api';
import EditProduct from './EditProduct.jsx';

//This component will show all the products in the database, and will show view and edit buttons for each product. The view button will show the product details, and the edit button will allow the user to edit the product details. This component will be used by the admin user to manage the products in the database.

const AllProducts = () => {
    //const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    //mock data for testing
    const products = [
        { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 9.99 },
        { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 19.99 },
        { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 29.99 },
    ];

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>All Products</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {products.map((product) => (
                    // show details of each product in same line, with view and edit buttons
                    // when view or edit button is clicked, navigate to EditProduct component, and pass the product id as a parameter in the url. The EditProduct component will fetch the product details from the backend using the product id, and show the product details in a form, and allow the admin user to edit the product details. When the admin user submits the form, send a PUT request to the backend to update the product details in the database. Also show a delete button that will allow the admin user to delete the product from the database.
                    <li key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ccc', padding: '20px', marginBottom: '10px' }}>
                        <div >
                            <h2>{product.name}</h2>
                        </div>
                        <div>
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <p>Price: ${product.price.toFixed(2)}</p>
                        </div>

                        <div >
                            <div className="counter" style={{ cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', marginRight: '10px' }}>
                                <button style={{ backgroundColor: 'blue', border: 'none', padding: '10px 20px', cursor: 'pointer' }} onClick={() => navigate(`/EditProduct/${product.id}`)}>View</button>
                            </div>
                            <div className="counter" style={{ cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                                <button style={{ backgroundColor: 'green', border: 'none', padding: '10px 20px', cursor: 'pointer' }} onClick={() => navigate(`/EditProduct/${product.id}`)}>Edit</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllProducts;