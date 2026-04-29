import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Search, Menu, Newspaper } from 'lucide-react';

import './Header.css';

export default function Header() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Candidates', path: '/candidates', icon: Users },
    { name: 'Turnout', path: '/turnout', icon: LayoutDashboard },
    { name: 'Map', path: '/constituency', icon: Search },
    { name: 'Register', path: '/register', icon: UserPlus },
    { name: 'Verify', path: '/verify', icon: Search },
    { name: 'News', path: '/news', icon: Newspaper },

  ];


  return (
    <header className="main-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <div className="logo-container">
            <img src="/logo.png" alt="ECI Logo" className="header-logo-img" />
          </div>
          <div className="logo-text">
            <span className="logo-primary">ECI</span>
            <span className="logo-secondary">Voter Portal</span>
          </div>
        </Link>

        <nav className="header-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className="menu-mobile">
            <Menu size={24} />
          </button>
        </div>

      </div>
    </header>
  );
}
