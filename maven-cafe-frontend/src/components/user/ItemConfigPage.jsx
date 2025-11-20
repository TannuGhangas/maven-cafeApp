// src/components/user/ItemConfigPage.jsx

import React, { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { 
    LOCATIONS, COFFEE_TYPES, TEA_TYPES, 
    MILK_TYPES, WATER_TYPES, SUGAR_LEVELS, 
    TABLE_NUMBERS 
} from '../../config/constants';

const ItemConfigPage = ({ 
    itemType, setPage, currentOrder, 
    setCurrentOrder, isEditMode, itemIndex, styles 
}) => {
    
    const typeOptions = 
        itemType === 'coffee' ? COFFEE_TYPES :
        itemType === 'tea' ? TEA_TYPES :
        itemType === 'milk' ? MILK_TYPES :
        itemType === 'water' ? WATER_TYPES : [];

    // Initialize itemConfig state
    const [itemConfig, setItemConfig] = useState(
        isEditMode ? currentOrder.items[itemIndex] : 
        {
            item: itemType,
            type: typeOptions.length > 0 ? typeOptions[0] : '', // Set default type if available
            sugarLevel: 1,
            quantity: 1,
            location: LOCATIONS[0],
            tableNo: null,
            customLocation: '',
            notes: ''
        }
    );

    useEffect(() => {
        // This ensures if the component is mounted for a new item, it gets the correct default type
        if (!isEditMode && typeOptions.length > 0 && itemConfig.type === '') {
            setItemConfig(prev => ({ ...prev, type: typeOptions[0] }));
        }
    }, [isEditMode, itemType]);

    const handleSave = () => {
        if (!itemConfig.type) {
             alert("Please select a type.");
             return;
        }
        if (itemConfig.location === 'Others' && !itemConfig.customLocation) {
             alert("Please specify the custom location.");
             return;
        }

        if (isEditMode) {
            const newItems = [...currentOrder.items];
            newItems[itemIndex] = itemConfig;
            setCurrentOrder(prev => ({ ...prev, items: newItems }));
        } else {
            setCurrentOrder(prev => ({ ...prev, items: [...prev.items, itemConfig] }));
        }
        setPage('item-selection');
    };

    return (
        <div style={styles.screenPadding}>
            <h3>{isEditMode ? 'Edit' : 'Configure'} {itemType.toUpperCase()}</h3>
            
            {/* Type Selection */}
            <label style={styles.label}>Select Type:</label>
            <select 
                style={styles.selectField}
                value={itemConfig.type} 
                onChange={e => setItemConfig({...itemConfig, type: e.target.value})}
            >
                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Sugar Level (if applicable) */}
            {(itemType === 'coffee' || itemType === 'tea') && (
                <>
                    <label style={styles.label}>Sugar Level (Spoons):</label>
                    <select 
                        style={styles.selectField}
                        value={itemConfig.sugarLevel} 
                        onChange={e => setItemConfig({...itemConfig, sugarLevel: parseInt(e.target.value)})}
                    >
                        {SUGAR_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </>
            )}

            {/* Quantity */}
            <label style={styles.label}>Quantity (Cups/Glasses):</label>
            <input 
                style={styles.inputField}
                type="number" 
                min="1" 
                value={itemConfig.quantity} 
                onChange={e => setItemConfig({...itemConfig, quantity: parseInt(e.target.value)})}
            />

            {/* Location Selection */}
            <label style={styles.label}>Delivery Location:</label>
            <select 
                style={styles.selectField}
                value={itemConfig.location} 
                onChange={e => setItemConfig({...itemConfig, location: e.target.value, tableNo: null, customLocation: ''})}
            >
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>

            {/* Table Number / Custom Location */}
            {itemConfig.location.includes('Podroom') && (
                <>
                    <label style={styles.label}>Table Number (1-25):</label>
                    <select 
                        style={styles.selectField}
                        value={itemConfig.tableNo || ''} 
                        onChange={e => setItemConfig({...itemConfig, tableNo: parseInt(e.target.value)})}
                    >
                        <option value="">Select Table</option>
                        {TABLE_NUMBERS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </>
            )}
            {itemConfig.location === 'Others' && (
                <>
                    <label style={styles.label}>Custom Location:</label>
                    <input 
                        style={styles.inputField}
                        type="text" 
                        value={itemConfig.customLocation} 
                        onChange={e => setItemConfig({...itemConfig, customLocation: e.target.value})}
                        placeholder="Specify location"
                    />
                </>
            )}

            {/* Notes */}
            <label style={styles.label}>Notes / Preferences:</label>
            <textarea 
                style={{ ...styles.inputField, height: '60px' }}
                value={itemConfig.notes} 
                onChange={e => setItemConfig({...itemConfig, notes: e.target.value})}
                placeholder="E.g., Extra hot, light milk"
            />

            <button style={styles.primaryButton} onClick={handleSave}>
                {isEditMode ? 'Update Item' : 'Add Item'}
            </button>
            
            <button 
                style={styles.secondaryButton} 
                onClick={() => setPage('item-selection')}
            >
                <FaChevronLeft /> Back to Items
            </button>
        </div>
    );
};

export default ItemConfigPage;