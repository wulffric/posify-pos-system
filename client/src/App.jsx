import { useState } from 'react'
import ProductInput from './Components/ProductInput.jsx'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import AllProducts from './Components/AllProducts.jsx'
import EditProduct from './Components/EditProduct.jsx'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>POSify Kiosk</h1>
      <Routes>
        <Route path="/" element={
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '150px', marginTop: '50px' }}>
              <div>
                <Login />
              </div>
              <div >
                <Register />
              </div>
              {/*<div>
                <AllProducts />
              </div>*/}
            </div>
            
          </div>

        } />
        <Route path="/ProductInput" element={<ProductInput />} />
        <Route path="/AllProducts" element={<AllProducts />} />
        <Route path="/EditProduct/:productId" element={<EditProduct />} />
      </Routes>
      {
        //<Link to="/ProductInput">Go to Product Input</Link>
      }
    </div>
  )

}

export default App
