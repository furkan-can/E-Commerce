import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { Home, Error } from '@/pages';
const Routers = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Routers
