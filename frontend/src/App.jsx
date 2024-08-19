import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import ProductDetail from './pages/ProductDetail'; // Importa el nuevo componente
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAuth from './components/ProtectedAuth';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />

                <Route element={<ProtectedAuth />}>
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Route>

                <Route element={<ProtectedRoute requiredRole="admin" />}>
                    <Route path="/products/create" element={<CreateProduct />} />
                    <Route path="/products/:id/edit" element={<EditProduct />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
