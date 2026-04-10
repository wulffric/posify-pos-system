import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import API_BASE_URL from '../config/api';

// this component will allow the admin user to edit and delete the product. The admin user can change the product name, description and price. 
// receive the product id as a prop, and fetch the product details from the backend using the product id. Then show the product details in a form, and allow the admin user to edit the product details. When the admin user submits the form, send a PUT request to the backend to update the product details in the database. Also show a delete button that will allow the admin user to delete the product from the database.

const EditProduct = ({ productId }) => {
    let [product, setProduct] = useState(null);
    const navigate = useNavigate();
    //mock data for testing
    const products = [
        { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 9.99 },
        { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 19.99 },
        { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 29.99 },
    ];
    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            if (response.ok) {
                navigate('/AllProducts');
            } else {
                console.error('Error updating product:');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                navigate('/AllProducts');
            } else {
                console.error('Error deleting product:');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    React.useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    if (!product) {
        product = { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 9.99 };
        //return <div>Loading...</div>;
    }

    return (
        <section id="center">
            <div className="login-container" >
                <div className="hero">
                    <h2>Edit Product</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                    <form style={{ width: '100%', maxWidth: '900px' }}>
                        <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label>Name: &emsp;&emsp; </label>
                                <input name="Name"
                                    type="text"
                                    value={product.name}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                            </div>
                            <div>
                                <label>Description: </label>
                                <textarea name="Description"
                                    value={product.description}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px', height: '20px' }}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Price: &nbsp; &emsp; &emsp; </label>
                                <input name="Price"
                                    type="number"
                                    value={product.price}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit"
                                    onClick={handleSubmit}
                                    className="counter"
                                    style={{ cursor: 'pointer', width: '150px', justifyContent: 'center', fontWeight: 'bold', marginTop: '10px' }}>
                                    Edit
                                </button>
                                <button type="button"
                                    onClick={() => navigate('/AllProducts')}
                                    className="counter"
                                    style={{ cursor: 'pointer', width: '150px', justifyContent: 'center', fontWeight: 'bold', marginTop: '10px' }}>
                                    Cancel
                                </button>
                                <button type="button"
                                    onClick={handleDelete}
                                    className="counter"
                                    style={{ cursor: 'pointer', width: '150px', justifyContent: 'center', fontWeight: 'bold', marginTop: '10px' }}>
                                    Delete
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditProduct;
