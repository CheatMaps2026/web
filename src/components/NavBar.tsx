import {Link} from 'react-router-dom'
import '../App.css'

export const NavBar = () => {
    const navItems = [
        {to: '/', label: 'Home'},
        {to: '/map', label: 'Map'},
        {to: '/about', label: 'About'},
        {to: '/contact', label: 'Contact'},
        {to: '/newsletter', label: 'Join our newsletter'},
        {to: '/verification', label: 'Verification'},
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
