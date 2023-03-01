import { Link, NavLink } from 'react-router-dom';
import './style.scss';
import { useUser, useAuth } from '../../react-query';

export const Navbar = () => {
    const { user } = useUser();
    const { logout } = useAuth();

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
                    {user &&
                        links.map(({ path, text}) => (
                            <li key={path} className={'nav-item'}>
                                <NavLink to={path}>
                                    {text}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>

                <div>
                    {user ? (
                        <a onClick={() => logout()}>
                            Logout
                        </a>
                    ) : (
                        <Link to={'/auth'}>
                            Login / Register
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}