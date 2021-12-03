import React, { useState, useRef, useEffect } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { links, social } from './data';
import logo from './logo.svg';

const Navbar = () => {
  const [showLink, setShowLink] = useState(false);
  const linkContainerRef = useRef(null);
  const linkRef = useRef(null);
  useEffect(() => {
    const height = linkRef.current.getBoundingClientRect().height;
    if (showLink) {
      linkContainerRef.current.style.height = height + 'px';
    } else {
      linkContainerRef.current.style.height = 0 + 'px';
    }
  }, [showLink]);
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" />
          <button
            className={`nav-toggle ${showLink ? 'active' : ''}`}
            onClick={() => setShowLink(!showLink)}
          >
            <span>&#9776;</span>
          </button>
        </div>
        <div className="links-container" ref={linkContainerRef}>
          <ul className="links" ref={linkRef}>
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <ul className="social-icons">
          {social.map((link) => (
            <li key={link.id}>
              <a href={link.url}>{link.icon}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
