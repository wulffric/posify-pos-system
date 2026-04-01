import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', 
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message); 
                setFormData({ name: '', email: '', password: '' });
            } else {
                alert("Error: " + (data.error || "Something went wrong"));
            }
        } catch (err) {
            alert("Could not connect to the server.");
        }
    };

    return (
        <section id="center">
            {/* Matches the Hero section from App.jsx */}
            <div className="hero">
                <h2>Staff Registration</h2>
                <p>Onboard a new cashier to the POSify system.</p>
            </div>

            {/* Added a container div to match the spacing of ProductInput */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input 
                            type="text" 
                            className="counter" 
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required 
                            style={{ marginBottom: '0' }} // Overriding default margin to use gap
                        />
                        <input 
                            type="email" 
                            className="counter" 
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required 
                            style={{ marginBottom: '0' }}
                        />
                        <input 
                            type="password" 
                            className="counter" 
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required 
                            style={{ marginBottom: '0' }}
                        />
                        <button type="submit" className="counter" style={{ cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                            Create Cashier Account
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;