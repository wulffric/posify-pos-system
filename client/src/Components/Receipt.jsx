

import React, { useState, useEffect } from 'react';

const Receipt = () => {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('order');
        if (data) {
            setOrderData(JSON.parse(data));
        }
    }, []);

    if (!orderData) {
        return <div>No order data found.</div>;
    }

    const { items, paymentMethod, cashAmount, change, cashierName, receiptNumber, date } = orderData;

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '400px', margin: 'auto', border: '1px solid #000' }}>
            <h2 style={{ textAlign: 'center' }}>POSify - Cashier</h2>
            <div>Receipt Number: {receiptNumber}</div>
            <div>Date: {formattedDate}</div>
            <div>Cashier Name: {cashierName}</div>
            <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>Item</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Qty</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Price</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>{item.name}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{item.quantity}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '10px' }}>
                <div>Subtotal: ${subtotal.toFixed(2)}</div>
                <div>Tax: ${tax.toFixed(2)}</div>
                <div>Total: ${total.toFixed(2)}</div>
            </div>
            {paymentMethod === "Cash" && (
                <div style={{ marginTop: '10px' }}>
                    <div>Cash Taken: ${cashAmount.toFixed(2)}</div>
                    <div>Change Given: ${change.toFixed(2)}</div>
                </div>
            )}
            {(paymentMethod === "Card" || paymentMethod === "Gift Card") && (
                <div style={{ marginTop: '10px' }}>
                    Payment done via {paymentMethod}
                </div>
            )}
        </div>
    );
}

export default Receipt;