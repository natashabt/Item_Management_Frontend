// src/ItemService.js
import axios from 'axios';

const ItemService = {
    getItems: async () => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        const response = await axios.get('http://localhost:8080/api/items', {
            auth: {
                username,
                password,
            },
        });
        return response.data;
    },

    createItem: async (item) => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        const response = await axios.post('http://localhost:8080/api/items', item, {
            auth: {
                username,
                password,
            },
        });
        return response.data;
    },

    updateItem: async (id, item) => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        const response = await axios.put(`http://localhost:8080/api/items/${id}`, item, {
            auth: {
                username,
                password,
            },
        });
        return response.data;
    },

    deleteItem: async (id) => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        await axios.delete(`http://localhost:8080/api/items/${id}`, {
            auth: {
                username,
                password,
            },
        });
    },
};

export default ItemService;
