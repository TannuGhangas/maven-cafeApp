// src/components/user/UserHomePage.jsx

import React from 'react';
import { FaChevronLeft } from 'react-icons/fa'; // Only imported FaChevronLeft in original, but not used here.

const UserHomePage = ({ setPage, currentOrder, setCurrentOrder, styles }) => {
    return (
        <div style={styles.screenPadding}>
            <h2>Select Slot:</h2>
            <div style={styles.slotContainer}>
                {['morning (9:00-12:00)', 'afternoon (1:00 - 5:30)'].map(slot => (
                    <button 
                        key={slot}
                        style={styles.slotButton(currentOrder.slot === slot)}
                        onClick={() => {
                            setCurrentOrder(prev => ({ ...prev, slot }));
                            setPage('item-selection');
                        }}
                    >
                        {slot.split('(')[0].trim()}
                        <br /><small>({slot.split('(')[1]}</small>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserHomePage;