// src/components/common/NavBar.jsx

import React from 'react';
import { FaUserCircle, FaCoffee, FaListAlt } from 'react-icons/fa';

const NavBar = ({ user, setPage, setModal, styles }) => {
    const isKitchenOrAdmin = user.role === 'kitchen' || user.role === 'admin';
    
    return (
        <div style={styles.navBar}>
            <h1 style={styles.appTitle}>Maven Cafe</h1>
            <div style={styles.navIcons}>
                
                {user.role === 'user' && (
                    <button style={styles.navButton} onClick={() => setPage('home')}>
                        <FaCoffee size={24} />
                    </button>
                )}

                {isKitchenOrAdmin && (
                    <button style={styles.navButton} onClick={() => setPage('kitchen-dashboard')}>
                        <FaListAlt size={24} />
                    </button>
                )}

                <button style={styles.navButton} onClick={() => setModal('profile')}>
                    <FaUserCircle size={24} />
                </button>
            </div>
        </div>
    );
};

export default NavBar;