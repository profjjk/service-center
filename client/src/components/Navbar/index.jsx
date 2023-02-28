import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './style.scss';

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const links = [
        { path: '/dashboard', text: 'Dashboard' },
        { path: '/customers', text: 'Customers' },
        { path: '/services', text: 'Service Jobs' },
        { path: '/inventory', text: 'Inventory' }
    ];

    return (
        <header>
            <nav>
                <div>
                    <Link to={'/'}>Service Center</Link>
                </div>

                <ul>
                    {
                        isLoggedIn &&
                        links.map(({ path, text}) => (
                                <li key={path} className={'nav-item'}>
                                    <NavLink to={path}>
                                        {text}
                                    </NavLink>
                                </li>
                            )
                        )
                    }

                </ul>

                <div>
                    {
                        isLoggedIn ?
                        <Link to={'/auth'} onClick={() => setIsLoggedIn(false)}>Logout</Link> :
                        <Link to={'/auth'} onClick={() => setIsLoggedIn(true)}>Login / Register</Link>
                    }
                </div>
            </nav>
        </header>
    )
}