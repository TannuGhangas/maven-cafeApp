// src/components/user/OrderConfirmationPage.jsx

import React from 'react';
import { FaTrash, FaEdit, FaCheckCircle, FaPlus } from 'react-icons/fa';

const OrderConfirmationPage = ({ setPage, currentOrder, setCurrentOrder, user, callApi, styles }) => {
    const handleDelete = (index) => {
        const newItems = currentOrder.items.filter((_, i) => i !== index);
        setCurrentOrder(prev => ({ ...prev, items: newItems }));
        if (newItems.length === 0) setPage('item-selection');
    };
    
    const handleProceed = async () => {
        const orderData = {
            userId: user.id,        
            userName: user.name,
            slot: currentOrder.slot,
            items: currentOrder.items,
            userRole: user.role, 
        };

        const data = await callApi('/orders', 'POST', orderData);
        if (data && data.success) {
            alert('Order Sent! The Kitchen has been notified.');
            setCurrentOrder({ slot: 'morning (9:00-12:00)', items: [] });
            setPage('home');
        }
    };

    return (
        <div style={styles.screenPadding}>
            <h3>Order Review (Slot: {currentOrder.slot.split('(')[0].trim()})</h3>
            
            <div style={styles.listContainer}>
                {currentOrder.items.map((item, index) => (
                    <div key={index} style={styles.orderItemCard}>
                        <div style={{ flexGrow: 1 }}>
                            <strong>{item.quantity}x {item.type} {item.item.toUpperCase()}</strong>
                            <small style={{ display: 'block', color: '#666' }}>
                                To: {item.location} {item.tableNo ? `(Table ${item.tableNo})` : ''}
                                {item.customLocation && `(${item.customLocation})`}
                            </small>
                            <small style={{ display: 'block' }}>
                                Sugar: {item.sugarLevel !== undefined ? item.sugarLevel : 'N/A'} | Notes: {item.notes || 'None'}
                            </small>
                        </div>
                        <button 
                            style={styles.editButton} 
                            // Format: item-config-edit-INDEX-ITEMTYPE
                            onClick={() => setPage(`item-config-edit-${index}-${item.item}`)}
                        >
                            <FaEdit />
                        </button>
                        <button 
                            style={styles.deleteButton} 
                            onClick={() => handleDelete(index)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px' }}>
                <button style={styles.primaryButton} onClick={handleProceed}>
                    <FaCheckCircle /> Proceed & Place Order
                </button>
                <button 
                    style={styles.secondaryButton} 
                    onClick={() => setPage('item-selection')}
                >
                    <FaPlus /> Add More Items
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;