import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />

                <Route element={<ProtectedRoute requiredRole="admin"/>}>
                    <Route path="/products/create" element={<CreateProduct />} />
                    <Route path="/products/:id/edit" element={<EditProduct />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
