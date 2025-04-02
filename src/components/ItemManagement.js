// src/ItemManager.js
import React, { useEffect, useState } from 'react';
import ItemService from './ItemService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ItemManager = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate(); 

    // Get the current user's username from localStorage
    const currentUsername = localStorage.getItem('username');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsData = await ItemService.getItems();
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching items:', error);
                setMessage('Failed to fetch items.');
            }
        };
        fetchItems();
    }, []);

    const handleCreateItem = async () => {
        try {
            await ItemService.createItem(newItem);
            setNewItem({ name: '', description: '' });
            const itemsData = await ItemService.getItems();
            setItems(itemsData);
            setMessage('Item added successfully.');
        } catch (error) {
            console.error('Error creating item:', error);
            setMessage('Failed to add item.');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await ItemService.deleteItem(id);
            const itemsData = await ItemService.getItems();
            setItems(itemsData);
            setMessage('Item deleted successfully.');
        } catch (error) {
            console.error('Error deleting item:', error);
            setMessage('Failed to delete item.');
        }
    };

    const handleUpdateItem = async (item) => {
        try {
            setNewItem({ id: item.id, name: item.name, description: item.description });
            setMessage('Item updated successfully.');
        } catch (error) {
            console.error('Error updating item:', error);
            setMessage('Failed to update item.');
        }
    };

    const handleLogout = () => {
        navigate('/'); 
        localStorage.removeItem('username'); 
        localStorage.removeItem('password'); 
    };

    const handleNavigateToUpload = () => {
        navigate('/files'); // Adjust the path according to your routing setup
    };

    return (
        <div className='comntainer mt-5'>
            <h2>Item Manager</h2>
            <input
                type="text"
                className='form-control mb-3'
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Item Name"
            />
            <input
                type="text"
                className='form-control mb-3'
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Item Description"
            />
            <button onClick={handleCreateItem} className="btn btn-success mb-3 mx-2">Add Item</button>
            <button onClick={handleLogout} className="btn btn-success mb-3">Logout</button> {/* Logout Button */}
            {message && <p>{message}</p>}
            <h3>Items List</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description} (Added by: {item.user.username})
                        {/* Check if the current username matches the item's username */}
                        {currentUsername === item.user.username && (
                            <>
                                <button onClick={() => handleUpdateItem(item)} className='btn btn-danger btn-sm mx-2'>Update</button>
                                <button onClick={() => handleDeleteItem(item.id)} className='btn btn-danger btn-sm'>Delete</button>
                            </>
                        )}
                    </li>
                ))}
                        <button onClick={handleNavigateToUpload}>Go to Upload Files</button>

            </ul>
        </div>
    );
};

export default ItemManager;
