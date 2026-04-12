import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API_BASE_URL from '../config/api';

// this component will allow the admin user to edit and delete the product. The admin user can change the product name, description and price. 
// receive the product id from the URL params, and fetch the product details from the backend using the product id. Then show the product details in a form, and allow the admin user to edit the product details. When the admin user submits the form, send a PUT request to the backend to update the product details in the database. Also show a delete button that will allow the admin user to delete the product from the database.

const EditProduct = () => {
    const { productId } = useParams();
    let [product, setProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            //if product is found, set the product data
            if (data) {
                setProduct(data);   
            }
            else {
                alert("Product not found");
                setProduct({ name: '', description: '', price: '' });
            }
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
                setSuccessMessage('Product updated successfully!');
                setTimeout(() => {
                    navigate('/AllProducts');
                }, 2000);
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
                console.log('Product deleted successfully');
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
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    }

    return (
        <section id="center">
            <div className="login-container" >
                <div className="hero">
                    <h2>Edit Product</h2>
                </div>
                {successMessage && (
                    <div style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '12px 20px',
                        margin: '20px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '16px'
                    }}>
                        {successMessage}
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                    <form style={{ width: '100%', maxWidth: '900px' }}>
                        <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label>Product ID: &emsp;</label>
                                <input name="ProductID"
                                    type="text"
                                    value={product._id || ''}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    disabled
                                />
                            </div>
                            <div>
                                <label>Name: &emsp;&emsp; </label>
                                <input name="Name"
                                    type="text"
                                    value={product.name || ''}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                            </div>
                            <div>
                                <label>Barcode: &emsp;</label>
                                <input name="Barcode"
                                    type="text"
                                    value={product.barcode || ''}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={(e) => setProduct({ ...product, barcode: e.target.value })} />
                            </div>
                            <div>
                                <label>Price: &nbsp; &emsp; &emsp; </label>
                                <input name="Price"
                                    type="number"
                                    value={product.price || ''}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
                            </div>
                            <div>
                                <label>Stock:  &emsp; &emsp; </label>
                                <input name="Stock"
                                    type="number"
                                    value={product.stock_quantity || ''}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })} />
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
