import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAuth from './components/ProtectedAuth';
import Cart from './components/Cart'
import UserProfile from './components/UserProfile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import TicketView from './components/TicketView';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                <Route element={<ProtectedAuth />}>
                    <Route path="/tickets/:id" element={<TicketView />} />
                    <Route path="/carts/:id" element={<Cart />} />
                    <Route path="/profile" element={<UserProfile />} />
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
