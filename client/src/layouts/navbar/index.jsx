import { Link, NavLink } from 'react-router-dom';
import { useAuth, useUser } from '../../components'
import './style.scss';

export const Navbar = () => {
    const { logout } = useAuth();
    const { user } = useUser();

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