import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, Customers, Jobs, Inventory, Authorization } from '../pages';
import { Navbar } from '../layouts';
import './style/main.scss';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/auth'} element={<Authorization/>} />
                <Route path={'/dashboard'} element={<Dashboard/>} />
                <Route path={'/customers'} element={<Customers/>} />
                <Route path={'/jobs'} element={<Jobs/>} />
                <Route path={'/inventory'} element={<Inventory/>} />
            </Routes>
        </>
    );
};

export default App;

// TODO: Create an alternate redirect method with react router for pages that need authorization.