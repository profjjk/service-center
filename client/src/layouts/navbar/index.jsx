import { Link, NavLink } from 'react-router-dom';
import { useAuth, useUser } from '../../components';
import './style.scss';
import { useQueryClient } from 'react-query';

export const Navbar = () => {
    const qc = useQueryClient();
    const { logout } = useAuth();
    const { user } = useUser();

    const links = [
        { path: '/dashboard', text: 'Dashboard' },
        { path: '/customers', text: 'Customers' },
        { path: '/jobs', text: 'Service jobs' },
        { path: '/inventory', text: 'Inventory' }
    ];

    const clearSelected = () => {
        qc.setQueryData('selectedJob', null);
        qc.setQueryData('selectedCustomer', null);
    };

    return (
        <header>
            <nav>
                <div>
                    <Link to={'/'}>Service Center</Link>
                </div>

                <ul>
                    {user &&
                        links.map(({ path, text }) => (
                            <li key={path} className={'nav-item'} onClick={clearSelected}>
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
    );
};