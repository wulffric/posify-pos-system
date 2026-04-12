import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import AllProducts from './AllProducts';


const AddNewProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        barcode: '',
        stock_quantity: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data, barcode should be a 12-digit number, and all fields should be filled
        const { name, price, barcode, stock_quantity } = formData;
        if (!name || !price || !barcode || !stock_quantity) {
            return alert("Please fill in all fields");
        } else if (barcode.length !== 12 || !/^\d+$/.test(barcode)) {
            return alert("Barcode must be a 12-digit number");
        }


        //barcode should be unique, so check if the barcode already exists in the database before adding the product
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/barcode/${formData.barcode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Product with this barcode already exists
                console.error('Product with this barcode already exists');
                return;
            }
        } catch (error) {
            console.error('Error checking barcode:', error);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/products/addNew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setSuccessMessage('Product added successfully!');
                setFormData({
                    name: '',
                    price: '',
                    barcode: '',
                    stock_quantity: ''
                });
                setTimeout(() => {
                    navigate('/AllProducts');
                }, 2000);
            } else {
                console.error('Error adding product:');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <section id="center">
            <div className="login-container" >
                <div className="hero">
                    <h2>Add New Product</h2>
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
                    <form style={{ width: '100%', maxWidth: '900px' }} onSubmit={handleSubmit}>
                        <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label>Name: &emsp;&emsp; </label>
                                <input name="name"
                                    type="text"
                                    value={formData.name}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label>Barcode: &emsp;</label>
                                <input name="barcode"
                                    type="text"
                                    value={formData.barcode}                                    
                                    placeholder="0-00000-00000-0"
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label>Price: &nbsp; &emsp; &emsp; </label>
                                <input name="price"
                                    type="number"
                                    value={formData.price}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label>Stock Quantity:  &emsp; &emsp; </label>
                                <input name="stock_quantity"
                                    type="number"
                                    value={formData.stock_quantity}
                                    className="counter"
                                    style={{ marginBottom: '0', width: '300px' }}
                                    onChange={handleChange} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit"
                                    className="counter"
                                    style={{ cursor: 'pointer', width: '150px', justifyContent: 'center', fontWeight: 'bold', marginTop: '10px' }}>
                                    Add Product
                                </button>
                                <button type="button"
                                    onClick={() => navigate('/AllProducts')}
                                    className="counter"
                                    style={{ cursor: 'pointer', width: '150px', justifyContent: 'center', fontWeight: 'bold', marginTop: '10px' }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddNewProduct;