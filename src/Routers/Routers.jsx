import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { Home, ProductDetails, Error } from '@/pages';
const Routers = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routers
