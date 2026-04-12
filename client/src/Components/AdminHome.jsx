//this will show links for admin to manage products, view sales reports, and manage employees
import React from 'react';
import { Link } from 'react-router-dom';
import ProductInput from './ProductInput.jsx'
import Register from './Register.jsx'
import AllProducts from './AllProducts.jsx'
import EditProduct from './EditProduct.jsx';
import AddNewProduct from './AddNewProduct.jsx';

const AdminHome = () => {
    return (
        <div>
            <h2>Admin Home</h2>
            <nav>
                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', marginTop: '50px', textDecoration: 'none' }}>
                    <li style={{ backgroundColor: '#6d75e3', padding: '20px', borderRadius: '8px', width: '40%' }} ><Link to="/ProductInput">Customer Cash Out</Link></li>
                    <li style={{ backgroundColor: '#6d75e3', padding: '20px', borderRadius: '8px', width: '40%' }} ><Link to="/Register">Create New User</Link></li>
                    <li style={{ backgroundColor: '#6d75e3', padding: '20px', borderRadius: '8px', width: '40%' }} ><Link to="/AddNewProduct">Add New Product</Link></li>
                    <li style={{ backgroundColor: '#6d75e3', padding: '20px', borderRadius: '8px', width: '40%' }} ><Link to="/AllProducts">Manage Products</Link></li>
                    <li style={{ backgroundColor: '#6d75e3  ', padding: '20px', borderRadius: '8px', width: '40%' }} ><Link to="/EditProduct">Edit Product</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminHome;