import React from 'react';
import { FaChevronLeft } from 'react-icons/fa'; // Only imported FaChevronLeft in original, but not used here.

// Defining the inline CSS styles based on the image's aesthetics (orange accents, rounded corners, shadows).
const styles = {
    screenPadding: {
        padding: '0 0 24px 0', // Remove horizontal padding for full-width banner
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        minHeight: '100vh',
        backgroundColor: '#fcfcfc',
    },
    // --- NEW STYLES FOR IMAGE HEADER ---
    headerBanner: {
        height: '250px', // Height remains 250px
        width: '100%',
        marginBottom: '25px',
        position: 'relative',
        borderRadius: '0 0 24px 24px', // Rounded bottom edge for the banner
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
    backgroundImage: (url) => ({
        // Updated placeholder dimensions for consistency with new height
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${url || 'https://placehold.co/800x250/4a4a4a/ffffff?text=Add+Image+URL'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // FIXED: Changed alignment to start from the top/center of the banner
        justifyContent: 'flex-start', 
        padding: '50px 24px 24px 24px', // Added top padding (50px) to move text down slightly
    }),
    bannerTitle: {
        fontSize: '1.8rem',
        fontWeight: '800',
        color: '#ffffff',
        // Added text shadow for better contrast against busy backgrounds
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)', 
    },
    bannerSubtitle: {
        fontSize: '0.95rem', // Slightly reduced font size for safety
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '500',
        marginTop: '5px',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)',
    },
    // ------------------------------------
    contentArea: {
        padding: '0 24px', // Re-introduce horizontal padding for content
    },
    headerText: {
        fontSize: '1.5rem',
        fontWeight: '800', // Bold header
        color: '#333333',
        marginBottom: '20px',
        textAlign: 'left',
    },
    slotContainer: {
        display: 'flex',
        gap: '15px',
        marginTop: '25px',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Ensures buttons are well-spaced
    },
    slotButton: (isSelected) => ({
        // Base styling for the buttons (rounded, soft shadow)
        flexGrow: 1,
        minWidth: '140px',
        maxWidth: '250px',
        padding: '20px 15px',
        borderRadius: '16px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        lineHeight: '1.4',

        // Conditional styling (Orange is the highlight color from the image)
        backgroundColor: isSelected ? '#FF7A3D' : '#ffffff',
        color: isSelected ? '#ffffff' : '#4a4a4a',
        fontWeight: isSelected ? '700' : '600',
        fontSize: '1.1rem',
        boxShadow: isSelected
            ? '0 8px 20px rgba(255, 122, 61, 0.5)' // Stronger shadow for selected
            : '0 3px 10px rgba(0, 0, 0, 0.05)', // Subtle shadow for unselected
    }),
    smallText: (isSelected) => ({
        fontSize: '0.9rem',
        color: isSelected ? 'rgba(255, 255, 255, 0.85)' : '#888888',
        fontWeight: 'normal',
    })
};

const UserHomePage = ({ setPage, currentOrder, setCurrentOrder, styles: _propStyles }) => {
    // === HERE IS WHERE YOU CAN PASTE YOUR IMAGE ADDRESS ===
    // Replace the empty string '' below with the URL of your desired background image.
    const HEADER_IMAGE_URL = 'https://tmdone-cdn.s3.me-south-1.amazonaws.com/store-covers/133003776906429295.jpg'; 
    // Example: const HEADER_IMAGE_URL = 'https://i.imgur.com/your-cafe-image.jpg';
    // ======================================================

    return (
        <div style={styles.screenPadding}>
            {/* Image Header Section */}
            <div style={styles.headerBanner}>
                <div style={styles.backgroundImage(HEADER_IMAGE_URL)}>
                    <h1 style={styles.bannerTitle}>Good Morning</h1>
                    <p style={styles.bannerSubtitle}>Start your day with a warm cup</p>
                </div>
            </div>

            <div style={styles.contentArea}>
                {/* Slot Selection Content */}
                <h2 style={styles.headerText}>Select Slot:</h2>
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
                            <br /><small style={styles.smallText(currentOrder.slot === slot)}>({slot.split('(')[1]}</small>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;