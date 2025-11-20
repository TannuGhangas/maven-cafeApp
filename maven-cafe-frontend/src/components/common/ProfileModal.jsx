// src/components/common/ProfileModal.jsx

import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt, FaEdit, FaListAlt, FaUsers } from 'react-icons/fa';

const ProfileModal = ({ user, onClose, handleLogout, setUser, setPage, callApi, styles }) => {
    const [userData, setUserData] = useState({ name: user.name, email: user.email || '' });
    const [isEditing, setIsEditing] = useState(false);
    const [profilePic, setProfilePic] = useState(localStorage.getItem(`profilePic_${user.id}`) || null);

    const fetchUserData = async () => {
        // Using existing user object for initial data, but fetching for latest updates
        const data = await callApi(`/user/${user.id}?userId=${user.id}&userRole=${user.role}`);
        if (data) {
            setUserData({ name: data.name, email: data.email || '' });
        }
    };

    const handleUpdate = async () => {
        if (!userData.name) {
            alert("Name cannot be empty.");
            return;
        }
        const data = await callApi(`/user/${user.id}`, 'PUT', { 
            userId: user.id, 
            userRole: user.role, 
            name: userData.name, 
            email: userData.email,
        });
        if (data && data.success) {
            alert('Profile updated successfully!');
            // Update app-level user state and localStorage
            const updatedUser = { ...user, name: data.user.name, email: data.user.email };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsEditing(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                localStorage.setItem(`profilePic_${user.id}`, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const navigateToPage = (pageName) => {
        setPage(pageName);
        onClose();
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2 style={{ marginBottom: '10px' }}>{user.name}'s Profile</h2>
                
                <div style={styles.profilePicContainer}>
                    <div style={styles.profileFrame(profilePic)}>
                        {!profilePic && <FaUserCircle size={60} style={{ color: '#ccc' }} />}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} />
                </div>

                <div style={styles.detailRow}>
                    <label>Name:</label>
                    {isEditing ? (
                        <input 
                            style={styles.inputField}
                            value={userData.name} 
                            onChange={(e) => setUserData({...userData, name: e.target.value})} 
                        />
                    ) : (
                        <span style={styles.detailValue} onClick={() => setIsEditing(true)}>{userData.name} <FaEdit size={14} /></span>
                    )}
                </div>

                <div style={styles.detailRow}>
                    <label>Username:</label>
                    <span style={styles.detailValue}>{user.username}</span>
                </div>

                <div style={styles.detailRow}>
                    <label>Role:</label>
                    <span style={styles.detailValue}>{user.role.toUpperCase()}</span>
                </div>

                <div style={styles.detailRow}>
                    <label>Email (Optional):</label>
                    {isEditing ? (
                        <input 
                            style={styles.inputField}
                            value={userData.email} 
                            onChange={(e) => setUserData({...userData, email: e.target.value})} 
                        />
                    ) : (
                        <span style={styles.detailValue} onClick={() => setIsEditing(true)}>{userData.email || 'N/A'}</span>
                    )}
                </div>

                {isEditing && (
                    <button style={styles.primaryButton} onClick={handleUpdate}>Save Changes</button>
                )}

                <button style={{ ...styles.primaryButton, marginTop: '10px' }} onClick={() => navigateToPage('orders-list')}>
                    <FaListAlt /> View My Orders
                </button>

                {user.role === 'admin' && (
                    <button style={{ ...styles.primaryButton, marginTop: '10px' }} onClick={() => navigateToPage('admin-users')}>
                        <FaUsers /> Admin Users
                    </button>
                )}

                <button style={styles.logoutButton} onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </button>
                
                <button style={styles.closeButton} onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

export default ProfileModal;