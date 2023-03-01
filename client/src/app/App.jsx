import { Routes, Route } from 'react-router-dom';
import { Home, Dashboard, Customers, Services, Inventory, Authorization } from '../pages';
import { Navbar } from '../components'
import './style.scss';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path={"/"} element={<Home/>} />
                <Route path={"/auth"} element={<Authorization/>} />
                <Route path={"/dashboard"} element={<Dashboard/>} />
                <Route path={"/customers"} element={<Customers/>} />
                <Route path={"/services"} element={<Services/>} />
                <Route path={"/inventory"} element={<Inventory/>} />
            </Routes>
        </>
    );
};

export default App;
