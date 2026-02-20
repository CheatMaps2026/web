import {Link} from 'react-router-dom'
import '../App.css'

export const NavBar = () => {
    const navItems = [
        {to: '/', label: 'Home'},
        {to: '/verification', label: 'Verification'},
        {to: '/map', label: 'Map'},
        {to: '/newsletter', label: 'Newsletter'},
        {to: '/about', label: 'About'},
        // {to: '/contact', label: 'Contact'},
    ]

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {navItems.map((item, index) => (
                    <li key={index} className="navbar__item">
                        <Link to={item.to} className={"navbar__link"}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )

}
