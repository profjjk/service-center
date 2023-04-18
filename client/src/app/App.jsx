import { Route, Routes } from 'react-router-dom';
import { Authorization, Customers, Dashboard, Home, Inventory, Jobs } from '../pages';
import { Navbar } from '../layouts';
import { useUser } from '../components';
import './style/main.scss';

const App = () => {
    const { user } = useUser();
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/auth'} element={<Authorization/>}/>
                {user && <>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/customers'} element={<Customers/>}/>
                    <Route path={'/jobs'} element={<Jobs/>}/>
                    <Route path={'/inventory'} element={<Inventory/>}/>
                </>}
            </Routes>
        </>
    );
};

export default App;

// TODO: Create an alternate redirect method with react router for pages that need authorization.