import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Icon from '../Photos/Icon.svg';
import Logo from '../Photos/MXM_ADRA_Logotype_January_2018_Color.png';
import User from '../Photos/User.svg';

const Header = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('JWT');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check if the role is 'Admin'
                setIsAdmin(decoded.role === 'Admin');
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, []);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const options = [
        { src: Icon, altText: 'Icon', to: '/Theme' },
        ...(isAdmin ? [{ src: User, altText: 'User', to: '/Users' }] : []) 
    ];

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('UserId');
        navigate('/'); 
    };

    return (
        <header className="header">
            <div className="header-logo">
                <div className="header-logo-icon">
                    <img src={Logo} alt="Logo" />
                </div>
            </div>
            <div className="header-options">
                {options.map((option, index) => (
                    <NavLink
                        key={index}
                        to={option.to}
                        className={({ isActive }) => `header-options-select ${isActive ? 'active' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <img src={option.src} className="delete-icon" alt={option.altText} />
                    </NavLink>
                ))}
            </div>
            <div className="header-options">
                <button className="header-options-select-quit" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </header>
    );
};

export default Header;
