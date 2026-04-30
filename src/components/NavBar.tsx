import { Link } from 'react-router-dom';
import '../App.css';
import { signInWithRedirect } from 'aws-amplify/auth';
import { useAuthState } from '../hooks/useAuthState';

const baseItems = [
    { to: '/observations', label: 'Observations' },
    { to: '/map', label: 'Map' },
];

export const NavBar = () => {
    const authState = useAuthState();

    if (authState === 'loading') return null;

    const isLoggedIn = authState == 'authorized' || authState === 'unauthorized';
    const navItems = [
    ...baseItems,
    ...(isLoggedIn ? [{ to: '/verification', label: 'Verification' }, { to: '/newsletter', label: 'Newsletter' }] : []),
    isLoggedIn
        ? { to: '/logout', label: 'Logout' }
        : { to: '/login', label: 'Login' }
];
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {navItems.map((item, index) => (
                    <li key={index} className="navbar__item">
                        <Link to={item.to} className="navbar__link">{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};