import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import ProductInput from './ProductInput.jsx'
import AdminHome from './AdminHome.jsx'
import API_BASE_URL from '../config/api';



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        <Router>
                <Route path="/ProductInput" element={<ProductInput />} />
                <Route path="/AdminHome" element={<AdminHome />} />
        </Router>
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('username', data.user.name);
            localStorage.setItem('userRole', data.user.role);

            if (data.user.role === 'admin') {
                navigate('/AdminHome');
            } else {
                navigate('/ProductInput');
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section id="center">
            <div className="login-container" >
                <div className="hero">
                    <h2>Login</h2>
                    <p>Access the POSify system.</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input
                                type="email"
                                name="email"
                                className="counter"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ marginBottom: '0' }}
                            />
                            <input
                                type="password"
                                name="password"
                                className="counter"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ marginBottom: '0' }}
                            />
                            <button type="submit"
                                onClick={handleSubmit}
                                className="counter"
                                style={{ cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login