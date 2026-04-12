
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Receipt from './Receipt';
import API_BASE_URL from '../config/api';

const ProductInput = () => {
    const navigate = useNavigate();
    const [cashierName] = localStorage.getItem('username') ? [localStorage.getItem('username')] : ["John Doe"]; // Hardcoded for demo
    const [searchTerm, setSearchTerm] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [addedItems, setAddedItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [cashAmount, setCashAmount] = useState("");
    const [change, setChange] = useState(0);
    const [showReceipt, setShowReceipt] = useState(false);

    // Mock items data
    const items = [
        { name: "Apple", barcode: "123", price: 1.00 },
        { name: "Banana", barcode: "456", price: 0.50 },
        { name: "Orange", barcode: "789", price: 0.75 },
        { name: "Milk", barcode: "101", price: 2.50 },
        { name: "Bread", barcode: "202", price: 3.00 },
    ];

    const addItem = async () => {
        if (!searchTerm) {
            alert("Please enter a product name or barcode");
            return;
        }

        try {
            // Try to fetch by barcode first
            const response = await fetch(`${API_BASE_URL}/api/products/barcode/${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const item = await response.json();
                
                // Add to cart
                const existingItem = addedItems.find(ai => ai._id === item._id);
                if (existingItem) {
                    setAddedItems(addedItems.map(ai => 
                        ai._id === item._id 
                            ? { ...ai, quantity: ai.quantity + quantity } 
                            : ai
                    ));
                } else {
                    setAddedItems([...addedItems, { ...item, quantity }]);
                }
                setSearchTerm("");
                setQuantity(1);
            } else {
                alert("Product not found");
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            alert("Error finding product. Please try again.");
        }
    };

    const removeItem = (index) => {
        setAddedItems(addedItems.filter((_, i) => i !== index));
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleCashAmountChange = (e) => {
        const amount = parseFloat(e.target.value) || 0;
        setCashAmount(e.target.value);
        setChange(amount - total);
    };

    const confirmOrder = () => {
        if (addedItems.length === 0) {
            alert("No items to confirm");
            return;
        }
        if (paymentMethod === "Cash" && parseFloat(cashAmount) < total) {
            alert("Insufficient cash amount");
            return;
        }
        // Store in localStorage
        const orderData = {
            items: addedItems,
            paymentMethod,
            cashAmount: paymentMethod === "Cash" ? parseFloat(cashAmount) : null,
            change: paymentMethod === "Cash" ? change : null,
            cashierName,
            receiptNumber: Date.now().toString(), // Simple receipt number
            date: new Date().toISOString()
        };
        localStorage.setItem('order', JSON.stringify(orderData));
        setShowReceipt(true);
    };

    const cancelOrder = () => {
        setAddedItems([]);
    };

    const subtotal = addedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    return (
        <div>
            {showReceipt ? (
                <Receipt />
            ) : (
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                    {/* Logo */}
                    <img src="/logo.png" alt="POS Logo" style={{ width: '150px', height: 'auto' }} />

                    {/* Cashier Info */}
                    <div style={{ marginTop: '10px' }}>
                        Logged in as: {cashierName} <a href="#" onClick={logout} style={{ marginLeft: '10px', color: 'blue' }}>Logout</a>
                    </div>

                    {/* Search Bar */}
                    <div style={{ marginTop: '20px' }}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or barcode"
                            style={{ width: '70%', padding: '8px' }}
                        />
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            min="1"
                            style={{ width: '10%', padding: '8px', marginLeft: '10px' }}
                        />
                        <button onClick={addItem} style={{ padding: '8px 16px', marginLeft: '10px' }}>Add Item</button>
                    </div>

                    {/* Items Table */}
                    <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedItems.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.price.toFixed(2)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>${(item.quantity * item.price).toFixed(2)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <button onClick={() => removeItem(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Calculations */}
                    <div style={{ marginTop: '20px' }}>
                        <div>Subtotal: ${subtotal.toFixed(2)}</div>
                        <div>Tax (13%): ${tax.toFixed(2)}</div>
                        <div>Total: ${total.toFixed(2)}</div>
                    </div>

                    {/* Payment Options */}
                    <div style={{ marginTop: '20px' }}>
                        <h3>Payment Method</h3>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="Cash"
                                checked={paymentMethod === "Cash"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Cash
                        </label>
                        <label style={{ marginLeft: '20px' }}>
                            <input
                                type="radio"
                                name="payment"
                                value="Card"
                                checked={paymentMethod === "Card"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Card
                        </label>
                        <label style={{ marginLeft: '20px' }}>
                            <input
                                type="radio"
                                name="payment"
                                value="Gift Card"
                                checked={paymentMethod === "Gift Card"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Gift Card
                        </label>
                        {paymentMethod === "Cash" && (
                            <div style={{ marginTop: '10px' }}>
                                <input
                                    type="number"
                                    value={cashAmount}
                                    onChange={handleCashAmountChange}
                                    placeholder="Enter cash amount"
                                    style={{ padding: '8px' }}
                                />
                                {cashAmount && (
                                    <div style={{ marginTop: '5px' }}>
                                        Change: ${change.toFixed(2)}
                                    </div>
                                )}
                            </div>
                        )}
                        {(paymentMethod === "Card" || paymentMethod === "Gift Card") && (
                            <div style={{ marginTop: '10px', color: 'blue' }}>
                                Check Instructions on Card Reader
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={confirmOrder} style={{ padding: '10px 20px', marginRight: '10px' }}>Order Confirm</button>
                        <button onClick={cancelOrder} style={{ padding: '10px 20px' }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductInput;