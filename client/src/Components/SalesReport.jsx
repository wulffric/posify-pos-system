import React, { useState, useEffect } from 'react';

const SalesReport = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrder = localStorage.getItem('order');
        if (savedOrder) {
            setOrders([JSON.parse(savedOrder)]);
        }
    }, []);

    const subtotal = orders.reduce((sum, order) => 
        sum + order.items.reduce((iSum, item) => iSum + (item.price * item.quantity), 0), 0
    );
    const tax = subtotal * 0.13;
    const totalRevenue = subtotal + tax;

    const handlePrint = () => {
      window.print();
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Daily Sales Report</h2>
                <button onClick={handlePrint} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Print Report
                </button>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1, padding: '15px', background: '#f4f4f4', borderRadius: '8px' }}>
                    <strong>Subtotal:</strong><br /> ${subtotal.toFixed(2)}
                </div>
                <div style={{ flex: 1, padding: '15px', background: '#f4f4f4', borderRadius: '8px' }}>
                    <strong>Tax (13%):</strong><br /> ${tax.toFixed(2)}
                </div>
                <div style={{ flex: 1, padding: '15px', background: '#eef6ff', borderRadius: '8px', border: '1px solid #bcd7f5' }}>
                    <strong>Total Revenue:</strong><br /> ${totalRevenue.toFixed(2)}
                </div>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                <h3>No sales recorded for this period.</h3>
                <p>Complete a transaction in the POS to see data here.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#ddd' }}>
                    <th style={{ border: '1px solid #999', padding: '8px' }}>Receipt #</th>
                    <th style={{ border: '1px solid #999', padding: '8px' }}>Date</th>
                    <th style={{ border: '1px solid #999', padding: '8px' }}>Items Sold</th>
                    <th style={{ border: '1px solid #999', padding: '8px' }}>Payment</th>
                    <th style={{ border: '1px solid #999', padding: '8px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                      <tr key={idx}>
                        <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                          {order.receiptNumber || 'N/A'}
                        </td>
                        <td style={{ border: '1px solid #999', padding: '8px' }}>
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td style={{ border: '1px solid #999', padding: '8px' }}>
                          {order.items.map(i => `${i.name} (x${i.quantity}) @ $${i.price.toFixed(2)}`).join(', ')}
                        </td>
                        <td style={{ border: '1px solid #999', padding: '8px' }}>{order.paymentMethod}</td>
                        <td style={{ border: '1px solid #999', padding: '8px' }}>
                          ${(order.items.reduce((s, i) => s + (i.price * i.quantity), 0) * 1.13).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
        </div>
    );
};

export default SalesReport;