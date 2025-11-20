// src/components/user/ItemSelectionPage.jsx

import React from 'react';
import { FaCoffee, FaMugHot, FaGlassWhiskey, FaTint, FaChevronLeft } from 'react-icons/fa';

const ItemSelectionPage = ({ setPage, currentOrder, styles }) => {
    const itemButtons = [
        { name: 'coffee', icon: FaCoffee },
        { name: 'tea', icon: FaMugHot },
        { name: 'milk', icon: FaGlassWhiskey },
        { name: 'water', icon: FaTint },
    ];
    
    return (
        <div style={styles.screenPadding}>
            <h3 style={{ margin: '10px 0' }}>Order for: {currentOrder.slot}</h3>
            <div style={styles.itemSelectionGrid}>
                {itemButtons.map(item => (
                    <button 
                        key={item.name}
                        style={styles.itemButton}
                        onClick={() => setPage(`item-config-${item.name}`)}
                    >
                        <item.icon size={30} /><br />
                        {item.name.toUpperCase()}
                    </button>
                ))}
            </div>
            
            {currentOrder.items.length > 0 && (
                <button 
                    style={styles.primaryButton} 
                    onClick={() => setPage('order-confirmation')}
                >
                    Review {currentOrder.items.length} Item(s)
                </button>
            )}
            
            <button 
                style={styles.secondaryButton} 
                onClick={() => setPage('home')}
            >
                <FaChevronLeft /> Back to Slot
            </button>
        </div>
    );
};

export default ItemSelectionPage;